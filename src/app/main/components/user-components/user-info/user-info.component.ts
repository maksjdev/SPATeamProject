import {Component, OnInit} from '@angular/core';
import {User} from '@shared/models/User';
import {UserService} from '@shared/auth/user.service';
import {AppStringService} from '@shared/services/app-string.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  user: User;

  constructor(
    private userService: UserService,
    private stringService: AppStringService
  ) {
    this.user = userService.getMockUser();
  }

  ngOnInit() {
  }

}
