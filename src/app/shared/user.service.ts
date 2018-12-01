import {Injectable} from '@angular/core';
import {User} from '@shared/models/User';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

@Injectable()
export class UserService {
  private currentUser: BehaviorSubject<User>;

  constructor() {
    this.currentUser = new BehaviorSubject(null);
  }

  public setUserData(user: User){
    this.currentUser.next(user);
  }
  public getUserData(): BehaviorSubject<User> {
    return this.currentUser;
  }
}
