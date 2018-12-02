import {Component, OnInit} from '@angular/core';
import {User} from '@shared/models/User';
import {AuthService} from '@shared/auth/auth.service';
import {UserService} from '@shared/user.service';
import {CONSTANTS} from '@shared/config/constants';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  user: User;
  isAdmin: boolean;
  adminPage: string = CONSTANTS.APP.ADMIN;

  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.userService.getUserData().subscribe(value => {
      if (value){
        this.user = value;
        this.isAdmin = this.userService.isAdmin();
      }
    });
  }

  onLogout(event){
    this.authService.onLogout();
  }
}
