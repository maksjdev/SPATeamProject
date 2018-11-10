import {Component} from '@angular/core';
import {User} from '@shared/models/User';
import {UserService} from '@shared/auth/user.service';
import {AppStringService} from '@shared/services/app-string.service';
import {AuthService} from '@shared/auth/auth.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent {
  user: User;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private stringService: AppStringService
  ) {
    this.user = userService.getMockUser();
  }

  onLogout(event){
    this.authService.onLogout();
  }

}
