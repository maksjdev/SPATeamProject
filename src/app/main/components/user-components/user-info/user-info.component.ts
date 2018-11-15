import {Component} from '@angular/core';
import {User} from '@shared/models/User';
import {AuthService} from '@shared/auth/auth.service';
import {UserService} from '@shared/user.service';

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
  ) {
    this.user = userService.getUserData();
  }

  onLogout(event){
    this.authService.onLogout();
  }

}
