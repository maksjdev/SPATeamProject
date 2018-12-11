import {Injectable} from '@angular/core';
import {User} from '@shared/models/User';
import {BehaviorSubject} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AppRestService} from '@shared/http/app-rest.service';

@Injectable()
export class UserDataService {
  private currentUser: BehaviorSubject<User>;

  constructor(
    private restService: AppRestService,
  ){
    this.currentUser = new BehaviorSubject(null);
  }

  public setCurrentUserData(user: User){
    this.currentUser.next(user);
  }
  public getCurrentUserData(): BehaviorSubject<User> {
    return this.currentUser;
  }


 public getUserData(id: string){
    return this.restService.getUserData(id).pipe(
      catchError(this.restService.handleError(`Get UserData #${id}`, []))
    );
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
