import {Component, OnDestroy, OnInit} from '@angular/core';
import {NewsDataService} from '@shared/news-data.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AppFormService} from '@shared/services/app-form.service';
import {News} from '@shared/models/News';
import {User} from '@shared/models/User';
import {UserService} from '@shared/user.service';
import {Category} from '@shared/models/Category';
import {HttpResponse} from '@angular/common/http';
import {CategoryDataService} from '@shared/category-data.service';
import {Subscription} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {CONSTANTS} from '@shared/config/constants';

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

  public formErrors = {
    n_title: '', n_text: '', n_image: '', n_tags: ''
  };

  constructor(
    private route: ActivatedRoute,
    private formBuild: FormBuilder,
    private userService: UserService,
    private formService: AppFormService,
    private newsService: NewsDataService,
    private categoryService: CategoryDataService
  ) {}

  ngOnInit() {
    this.pageTitle = 'Добавление новости';
    let title = '', image =  '', tags = [], text = '';

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
      tags = this.news.getTags();
      text = this.news.getText();
    }
    this.addNewsForm = this.formBuild.group({
      n_title:    [title, [Validators.required]],
      n_image:    [image, [Validators.required]],
      n_tags:    [tags, [Validators.required]],
      n_text: [text, [Validators.required]]
    });
  }

  public onAddNews(event): void{
    if (this.addNewsForm.valid){
      // Собираем информацию с полей
      let title: string = this.addNewsForm.value['n_title'];
      let text: string = this.addNewsForm.value['n_text'];
      let image: string = this.addNewsForm.value['n_image'];
      let tags: Array<string> = this.addNewsForm.value['n_tags'];

      let author: User = this.userService.getUserData().getValue();
      let date = new Date();

      let news: News = new News('228', author, date, title, text, image, tags);
      this.newsService.sendNews(news).pipe().subscribe( (value: HttpResponse<ArrayBuffer>) => {
        // Если отправка удалась -> иди на главную
        this.addNewsForm.reset();
        console.log(value);
      });
    } else {
      this.formErrors = this.formService.validateForm(this.addNewsForm, this.formErrors, false);
    }
  }
  public onDeleteNews(event){
    if (this.news && confirm(CONSTANTS.MSG.CONFIRM_DEL_NEWS)) {
      let id: string = this.news.getId();
      this.newsService.deleteNews(id);
    }
  }
  public onResetNews(event){
    if (confirm(CONSTANTS.MSG.CONFIRM_RST_NEWS)){
      this.addNewsForm.reset();
    }
  }
}
