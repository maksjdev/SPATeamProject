import {Injectable} from '@angular/core';
import {User} from '@shared/models/User';
import {BehaviorSubject, Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {AppRestService} from '@shared/http/app-rest.service';

@Injectable()
export class UserDataService {
  private jwtToken: string;
  private currentUser: BehaviorSubject<User>;

  constructor(
    private restService: AppRestService,
  ){
    this.currentUser = new BehaviorSubject(null);
  }

  public setCurrentJWT(token: string) {
    this.jwtToken = token;
  }
  public setCurrentUserData(user: User) {
    this.currentUser.next(user);
  }

  public getCurrentJWT(): string {
    return this.jwtToken;
  }
  public getCurrentUserData(): BehaviorSubject<User> {
    return this.currentUser;
  }


  public getUserData(id: string): Observable<User> {
    return this.restService.getUserData(id).pipe(
      map(v => {
        let id = v['_id'], realname = v['realname'], nickname = v['nickname'],
          email = v['email'], img = v['img_url'], rating = v['rating'], role = v['role'],
          bookmarks = v['bookmarks'];
        let user = new User(id, realname, nickname, email, img, rating, role, bookmarks);
        return user;
      }),
      catchError(this.restService.handleError<User>(`Get UserData #${id}`))
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
