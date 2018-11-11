import { Injectable } from '@angular/core';
import {User} from '@shared/models/User';
import {CONSTANTS} from '@shared/config/constants';

@Injectable()
export class UserService {
  mockActiveUser: User;

  constructor() {
    let linkUser: string = CONSTANTS.MOCK.USER_IMAGE;
    this.mockActiveUser = new User('Sirius', 'Dark', linkUser, 0, 'Admin');
  }

  public getMockUser(): User {
    return this.mockActiveUser;
  }
}
