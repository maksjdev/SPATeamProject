import {Component, OnDestroy, OnInit} from '@angular/core';
import {NewsDataService} from '@shared/news-data.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AppFormService} from '@shared/services/app-form.service';
import {News} from '@shared/models/News';
import {User} from '@shared/models/User';
import {UserDataService} from '@shared/user-data.service';
import {Category} from '@shared/models/Category';
import {HttpResponse} from '@angular/common/http';
import {CategoryDataService} from '@shared/category-data.service';
import {Observable, Subscription} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {CONSTANTS} from '@shared/config/constants';
import {AppDialogService} from '@shared/services/app-dialog.service';

@Component({
  selector: 'app-add-news-page',
  templateUrl: './add-news-page.component.html',
  styleUrls: ['./add-news-page.component.scss']
})
export class AddNewsPageComponent implements OnInit {
  public news: News;
  public pageTitle: string;
  public categories: Array<Category>;
  public addNewsForm: FormGroup;
  private _subscription: Subscription;
  public imageArr: Array<string>;

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
    private categoryService: CategoryDataService
  ) {
    this.imageArr = [
      'https://pre00.deviantart.net/b5bc/th/pre/i/2016/001/4/6/witcher_3_new_year_2016_by_maxifen-d9mah8e.png',
      'https://img2.goodfon.com/original/1366x768/f/4a/shokugeki-no-soma-soma-paren.jpg',
      'https://img4.goodfon.com/wallpaper/nbig/5/98/art-anime-novyi-god-iolka-devushki.jpg'
    ];
  }

  ngOnInit() {
    this.pageTitle = 'Добавление новости';
    let title = '', image =  '', categories = [], text = '';

    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        let id = params.get('id');
        return this.newsService.getFullNewsData(id);
      })
    ).subscribe( (news: News) => {
      this.news = news;
      if (news) this.pageTitle = 'Редактирование новости';
    });

    this._subscription = this.categoryService.getAllCategories().subscribe((value: Array<Category>) => {
      this.categories  = value;
    });

    if (this.news){
      title = this.news.getTitle();
      image = this.news.getImage();
      categories = this.news.getCategories();
      text = this.news.getText();
    }
    this.addNewsForm = this.formBuild.group({
      n_title:    [title, [Validators.required]],
      n_image:    [image, [Validators.required]],
      n_categories:    [categories, [Validators.required]],
      n_text: [text, [Validators.required]]
    });
  }

  public onAddNews(event): void{
    if (this.addNewsForm.valid){
      // Собираем информацию с полей
      let title: string = this.addNewsForm.value['n_title'];
      let text: string = this.addNewsForm.value['n_text'];
      let image: string = this.addNewsForm.value['n_image'];
      let categories: Array<string> = this.addNewsForm.value['n_categories'];

      let author: User = this.userService.getCurrentUserData().getValue();
      let date = new Date();

      let news: News = new News('100', author, date, title, text, image, categories);
      this.newsService.createNews(news).pipe().subscribe( (value: HttpResponse<ArrayBuffer>) => {
        // Если отправка удалась -> иди на главную
        this.addNewsForm.reset();
        console.log(value);
      });
    } else {
      this.formErrors = this.formService.validateForm(this.addNewsForm, this.formErrors, false);
    }
  }
  public onDeleteNews(event){
    if (this.news && this.dialogService.confirmDialog(CONSTANTS.MSG.CONFIRM_DEL_NEWS)) {
      let id: string = this.news.getId();
      this.newsService.deleteNews(id);
    }
  }
  public onResetNews(event){
    if (this.dialogService.confirmDialog(CONSTANTS.MSG.CONFIRM_RST_NEWS)){
      this.addNewsForm.reset();
    }
  }
  canDeactivate(): Observable<boolean> | boolean {
    if (this.addNewsForm.value['n_title'] || this.addNewsForm.value['n_text']) {
      return this.dialogService.confirmDialog('Отменить ваши изменения новости?');
    }
    return true;
  }
}
