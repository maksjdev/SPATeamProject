import {Component, OnInit} from '@angular/core';
import {NewsDataService} from '@shared/news-data.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AppFormService} from '@shared/services/app-form.service';
import {News} from '@shared/models/News';
import {User} from '@shared/models/User';
import {UserService} from '@shared/user.service';
import {Category} from '@shared/models/Category';
import {catchError} from 'rxjs/operators';
import {HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-add-news-page',
  templateUrl: './add-news-page.component.html',
  styleUrls: ['./add-news-page.component.scss']
})
export class AddNewsPageComponent implements OnInit {
  public news: News;
  public categories: Array<Category>;
  public addNewsForm: FormGroup;

  public formErrors = {
    n_title: '', n_text: '', n_image: '', n_tags: ''
  };

  constructor(
    private formBuild: FormBuilder,
    private formService: AppFormService,
    private newsService: NewsDataService,
    private userService: UserService
  ) {}

  ngOnInit() {
    let title = '', image =  '', tags = [], text = '';

    // Передали статью (не обязательно) и категории
    this.news = this.newsService.getFullNews('1');
    this.categories = this.newsService.getCategories();

    if (this.news){
      title = this.news.title;
      image = this.news.image;
      tags = this.news.tags;
      text = this.news.text;
    }
    this.addNewsForm = this.formBuild.group({
      n_title:    [title, [Validators.required]],
      n_image:    [image, [Validators.required]],
      n_tags:    [tags, [Validators.required]],
      n_text: [text, [Validators.required]]
    });
  }

  onAddNews(event){
    if (this.addNewsForm.valid){
      // Собираем информацию с полей
      let title: string = this.addNewsForm.value['n_title'];
      let text: string = this.addNewsForm.value['n_text'];
      let image: string = this.addNewsForm.value['n_image'];
      let tags: Array<string> = this.addNewsForm.value['n_tags'];

      let author: User = this.userService.getUserData().getValue();
      let date = new Date();

      let news: News = new News(author, date, title, text, image, tags);
      this.newsService.sendNews(news).pipe().subscribe( (value: HttpResponse<ArrayBuffer>) => {
        // Если отправка удалась -> иди на главную
        this.addNewsForm.reset();
        console.log(value);
      });
    } else {
      this.formErrors = this.formService.validateForm(this.addNewsForm, this.formErrors, false);
    }
  }
}
