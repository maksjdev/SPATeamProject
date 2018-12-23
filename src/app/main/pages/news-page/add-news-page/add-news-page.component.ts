import {Component, OnInit} from '@angular/core';
import {NewsDataService} from '@shared/news-data.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AppFormService} from '@shared/services/app-form.service';
import {News} from '@shared/models/News';
import {User} from '@shared/models/User';
import {UserDataService} from '@shared/user-data.service';
import {Category} from '@shared/models/Category';
import {CategoryDataService} from '@shared/category-data.service';
import {Observable, Subscription} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {CONSTANTS} from '@shared/config/constants';
import {AppDialogService} from '@shared/services/app-dialog.service';
import {AppRoutingService} from '@routes/app-routing.service';

@Component({
  selector: 'app-add-news-page',
  templateUrl: './add-news-page.component.html',
  styleUrls: ['./add-news-page.component.scss']
})
export class AddNewsPageComponent implements OnInit {
  public news: News;
  public categories: Array<Category>;
  public addNewsForm: FormGroup;
  private _subscription: Subscription;
  public imageArr: Array<string>;
  public pageEdit: boolean;

  public formErrors = {
    n_title: '', n_text: '', n_image: '', n_categories: ''
  };

  constructor(
    private route: ActivatedRoute,
    private formBuild: FormBuilder,
    private userService: UserDataService,
    private formService: AppFormService,
    private newsService: NewsDataService,
    private dialogService: AppDialogService,
    private categoryService: CategoryDataService,
    private routingService: AppRoutingService
  ) {
    this.imageArr = [
      'https://pre00.deviantart.net/b5bc/th/pre/i/2016/001/4/6/witcher_3_new_year_2016_by_maxifen-d9mah8e.png',
      'https://img2.goodfon.com/original/1366x768/f/4a/shokugeki-no-soma-soma-paren.jpg',
      'https://img4.goodfon.com/wallpaper/nbig/5/98/art-anime-novyi-god-iolka-devushki.jpg'
    ];
  }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        let id = params.get('id');
        return this.newsService.getFullNewsData(id);
      })
    ).subscribe( (news: News) => {
      this.news = news;
      if (this.news) {
        this.pageEdit = true;
        this.setFormFields(this.news);
      }
    });

    this._subscription = this.categoryService.getCurrentCategoriesData().subscribe((value: Array<Category>) => {
      this.categories  = value;
    });

    this.addNewsForm = this.formBuild.group({
      n_title:    ['', [Validators.required]],
      n_image:    ['', [Validators.required]],
      n_categories: ['', [Validators.required]],
      n_text:       ['', [Validators.required]]
    });
  }

  public onAddNews(event): void{
    if (this.addNewsForm.valid){
      // Собираем информацию с полей
      let title: string = this.addNewsForm.value['n_title'];
      let text: string = this.addNewsForm.value['n_text'];
      let image: string = this.addNewsForm.value['n_image'];
      let categories: Array<Category> = this.addNewsForm.value['n_categories'];

      if (this.pageEdit){
        let author: User = this.userService.getCurrentUserData().getValue();
        let news: News = new News(this.news.getId(), author, new Date(), title, text, image, categories);
        this.newsService.updateNews(news).then( (success: boolean) => {
          if (!success) return;
          this.addNewsForm.reset();
          this.routingService.goToLink(CONSTANTS.APP.MAIN);
        });
      } else {
        let author: User = this.userService.getCurrentUserData().getValue();
        let news: News = new News('100', author, new Date(), title, text, image, categories);

        this.newsService.createNews(news).then( (success: boolean) => {
          if (!success) return;
          this.addNewsForm.reset();
          this.routingService.goToLink(CONSTANTS.APP.MAIN);
        });
      }
    } else {
      this.formErrors = this.formService.validateForm(this.addNewsForm, this.formErrors, false);
    }
  }
  public onDeleteNews(event){
    if (this.news ){
      this.dialogService.confirmDialog(CONSTANTS.MSG.CONFIRM_DEL_NEWS).toPromise().then((value: boolean) => {
        if (!value) { return; }

        let id: string = this.news.getId();
        this.newsService.deleteNews(id).then((result: boolean) => {
          this.addNewsForm.reset();
          this.routingService.goToLink(CONSTANTS.APP.MAIN);
        });
      });
    }
  }
  public onResetNews(event){
    this.dialogService.confirmDialog(CONSTANTS.MSG.CONFIRM_RST_NEWS).toPromise().then( (value: boolean) => {
      if (value) this.addNewsForm.reset();
    })
  }
  private setFormFields(news: News){
    let title = news.getTitle();
    let image = news.getImage();
    let categories = news.getCategories();
    let text = news.getText();

    this.addNewsForm.controls['n_title'].setValue(title);
    this.addNewsForm.controls['n_image'].setValue(image);
    this.addNewsForm.controls['n_categories'].setValue(categories);
    this.addNewsForm.controls['n_text'].setValue(text);
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (this.addNewsForm.value['n_title'] || this.addNewsForm.value['n_text']) {
      return this.dialogService.confirmDialog(CONSTANTS.MSG.CONFIRM_RST_CHANGE);
    }
    return true;
  }
}
