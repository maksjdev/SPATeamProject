import {Component, OnInit} from '@angular/core';
import {AppRoutingService} from '@routes/app-routing.service';
import {CONSTANTS} from '@shared/config/constants';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AppFormService} from '@shared/services/app-form.service';
import {CustomValidators} from '@shared/services/custom-validators';
import {CategoryDataService} from '@shared/category-data.service';
import {Category} from '@shared/models/Category';
import {AppDialogService} from '@shared/services/app-dialog.service';
import {UserDataService} from '@shared/user-data.service';
import {User} from '@shared/models/User';

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
    private userService: UserDataService,
    private dialogService: AppDialogService,
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
      let category = new Category('100', name, 0);

      this.categoryService.createCategory(category).then( (created: boolean) => {
        if (created) {
          this.CategoryForm.reset();
          this.dialogService.showToastSuccess(CONSTANTS.MSG.CATEGORY_ADD);
          this.categoryService.reloadCurrentCategoriesData();
        }
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
    this.dialogService.showToastInfo(`
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
  public loadData(event){
    let id: string = this.userService.getCurrentUserData().getValue().id;
    this.userService.getUserData(id).then((user: User) => {
      this.dialogService.showToastWarning(
        Object.keys(user).length > 0 ? user.toString()
          : 'Запути сервер *npm server|mock*, дурашка))');
    });
  }
  public onJWT(event){
    let jwt: string = this.userService.getCurrentJWT();
    this.dialogService.showToastInfo(`${jwt}\n УЖЕ СКОПИРОВАН В БУФЕР!`, 'Твой JWT token:');
    this.formService.copyStringToClipboard(jwt);
  }
}
