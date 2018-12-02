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

  public isAdmin(): boolean {
    let user: User = this.currentUser.getValue();
    /*  Самая "надежная проверка" на админа из всех что видел этот свет
        Если бы еще была иконна вообще было бы кайфово
        Само собой нужно идти на сервер, но не пойти бы вам нахуй?
    */
    return user.role.toLocaleLowerCase() === 'admin';
  }
}
