import {Injectable} from '@angular/core';
import {User} from '@shared/models/User';
import {BehaviorSubject, Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {AppRestService} from '@shared/http/app-rest.service';
import {NgxPermissionsService} from 'ngx-permissions';
import {CONSTANTS} from '@shared/config/constants';

@Injectable()
export class UserDataService {
  private jwtToken: string;
  private currentUser: BehaviorSubject<User>;
  private allPermisions = {
    guest: 'Guest',
    user: 'User',
    admin: 'Admin'
  };

  constructor(
    private restService: AppRestService,
    private permissionsService: NgxPermissionsService
  ){
    // Устанавливает начальные права
    permissionsService.addPermission(this.allPermisions.guest);
    this.currentUser = new BehaviorSubject(null);
  }

  public setCurrentJWT(token: string) {
    this.jwtToken = token;
  }

  public setCurrentUserData(user: User) {
    this.currentUser.next(user);
    this.permissionsService.addPermission(this.allPermisions.user);
    if (this.isAdmin()) {
      this.permissionsService.addPermission(this.allPermisions.admin);
    }
  }

  public deleteCurrentUserData(): void{
    this.currentUser.next(null);
    this.setCurrentJWT(null);
    this.permissionsService.removePermission(this.allPermisions.user);
    if (this.permissionsService.hasPermission(this.allPermisions.admin)) {
      this.permissionsService.removePermission(this.allPermisions.admin);
    }
  }

  public getCurrentJWT(): string {
    return this.jwtToken;
  }
  public getCurrentUserData(): BehaviorSubject<User> {
    return this.currentUser;
  }

  public getUserData(id: string): Observable<User> {
    return this.restService.getUserData(id).pipe(
      map((v: object) => {
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
    /*  Самая "надежная проверка" на админа из всех что видел этот свет
        Если бы еще была иконна вообще было бы кайфово
        Само собой нужно идти на сервер, но не пойти бы вам нахуй? */
    let user: User = this.currentUser.getValue();
    return user.getRole().toLocaleLowerCase() === 'admin';
  }
}
