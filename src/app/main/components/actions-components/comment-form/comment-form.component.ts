import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {UserService} from '@shared/user.service';
import {User} from '@shared/models/User';
import {Comment} from '@shared/models/Comment';

import {Subscription} from 'rxjs';
import {AppRoutingService} from '@routes/app-routing.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AppFormService} from '@shared/services/app-form.service';
import {CustomValidators} from '@shared/services/custom-validators';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss']
})
export class CommentFormComponent implements OnInit, OnDestroy {
  public currentUser: User;
  public CommentForm: FormGroup;

  private subscription: Subscription;
  @Output() addComment = new EventEmitter();

  public formErrors = {
    c_text: ''
  };

  constructor(
    private formBuild: FormBuilder,
    private formService: AppFormService,
    private userService: UserService,
    private routerService: AppRoutingService
  ) { }

  ngOnInit() {
    this.subscription = this.userService.getUserData().subscribe(value => {
      this.currentUser = value;
    });

    this.CommentForm = this.formBuild.group({
      c_text:    ['', [Validators.required,
        CustomValidators.validateLimits(5, 1000),
        CustomValidators.validateCharacters()]],
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onAddComment(event){
    if (this.CommentForm.valid){
      let text: string = this.CommentForm.value['c_text'];
      // id + date - проставит сервер
      let comment = new Comment(1, this.currentUser, text, new Date());

      this.addComment.emit(comment);
      this.CommentForm.reset();
    } else {
      this.formErrors = this.formService.validateForm(this.CommentForm, this.formErrors, false);
    }
  }
  goToLogin(event){
    this.routerService.goToLinkSave('login');
  }
}
