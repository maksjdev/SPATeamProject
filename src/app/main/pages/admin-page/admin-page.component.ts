import {Component, OnInit} from '@angular/core';
import {AppRoutingService} from '@routes/app-routing.service';
import {CONSTANTS} from '@shared/config/constants';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AppFormService} from '@shared/services/app-form.service';
import {CustomValidators} from '@shared/services/custom-validators';
import {CategoryDataService} from '@shared/category-data.service';
import {Category} from '@shared/models/Category';
import {HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {
  public CategoryForm: FormGroup;

  public formErrors = {
    c_name: ''
  };

  constructor(
    private formBuild: FormBuilder,
    private formService: AppFormService,
    private routingService: AppRoutingService,
    private categoryService: CategoryDataService,
  ) { }

  ngOnInit(): void {
    this.CategoryForm = this.formBuild.group({
      c_name:    ['', [Validators.required,
        CustomValidators.validateLimits(2,20),
        CustomValidators.validateCharacters()]],
    });
  }

  public onAddCategory(){
    if (this.CategoryForm.valid){
      let name: string = this.CategoryForm.value['c_name'];
      let category = new Category('1111', name, 0);

      this.categoryService.sendCategory(category).pipe().subscribe( (value: HttpResponse<ArrayBuffer>) => {
        // Если отправка удалась -> сообщить
        this.CategoryForm.reset();
        console.log(value);
      });
      this.formErrors = {c_name: ''};
    } else {
      this.formErrors = this.formService.validateForm(this.CategoryForm, this.formErrors, false);
    }
  }

  public onAddNews(event){
    this.routingService.goToLink(CONSTANTS.APP.NEWS+'/'+CONSTANTS.APP.CREATE);
  }
  public onSpoiler(event){
    alert(`
      ТЫ УМРЕШЬ
      И ВСЕ КОГО ТЫ ЗНАЛ - ТОЖЕ
      БОГА НЕТ
      БУДЕТ ПРОСТО ПУСТОТА..
      ИГРЫ - ТРАТА ВРЕМЕНИ
      СЕРИАЛЫ - ТОЖЕ
      ТЫ ЛЕНИВЫЙ И НИХРЕНА НЕ ДОБЪЕШСЯ
      ЖИВЕШЬ В ШАРАГЕ
      ГРЕЧКА ДОРОЖАЕТ
      А ТЫ НИЩЕБРОД
      СВЯЗЕЙ - НЕТ, А СКОРО АРМИЯ
      И ДРУЗЕЙ ТОЖЕ - НЕТ
      К ТОМУ ЖЕ - ТЫ ПРИЕМНЫЙ
    `);
  }
}
