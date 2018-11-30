import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AppFormService} from '@shared/services/app-form.service';
import {AuthService} from '@shared/auth/auth.service';
import {CustomValidators} from '@shared/services/custom-validators';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent implements OnInit {
  public registrationForm: FormGroup;
  navLinks = [
    {path: '/login',  label: 'Sign In', class: 'active'},
    {path: '/registration',  label: 'Sign Up', class: 'active'},
  ];

  public formErrors = {
    r_image: '', r_real_name: '', r_nickname: '',
    r_email: '', r_agreement: '', r_password: '', r_re_password: ''
  };

  constructor(
    private formBuild: FormBuilder,
    private formService: AppFormService,
    private authService: AuthService,
  ) { }

  ngOnInit() {

    this.registrationForm = this.formBuild.group({
      r_image:    [''],
      r_real_name: ['', [Validators.required, CustomValidators.validateLimits(4, 20)]],
      r_nickname: ['', [Validators.required, CustomValidators.validateLimits(4, 20)]],
      r_email: ['', [Validators.required , Validators.email]],
      r_agreement: [false, [CustomValidators.validateBoolean(true)]],
      r_password: ['', [Validators.required, CustomValidators.validateLimits(6, 20)]],
      r_re_password: ['', [Validators.required, CustomValidators.validateLimits(6, 20)]],
    }, {validator: this.checkPasswords });
  }

  onRegister(){
    if (this.registrationForm.valid){
      let image: string = this.registrationForm.value['r_image'],
          realName: string = this.registrationForm.value['r_real_name'],
          nickname: string = this.registrationForm.value['r_nickname'],
          email: string = this.registrationForm.value['r_email'],
          password: string = this.registrationForm.value['r_password'];

      this.authService.onRegister(realName, nickname, email, password, image);
      this.registrationForm.reset();
    } else {
      this.formErrors = this.formService.validateForm(this.registrationForm, this.formErrors, false);
    }
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.controls.r_password;
    let confirmPass = group.controls.r_re_password;

    if (pass.value !== confirmPass.value) {
      //pass.setErrors({ pass_different: true });
      confirmPass.setErrors({ pass_different: true });
      return { pass_different: true };
    } else {
      return null;
    }
  }
}
