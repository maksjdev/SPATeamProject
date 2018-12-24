import {Injectable} from '@angular/core';
import {User} from '@shared/models/User';
import {BehaviorSubject, Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {AppRestService} from '@shared/http/app-rest.service';
import {NgxPermissionsService} from 'ngx-permissions';
import {DtoService} from '@shared/dto.service';

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
    private permissionsService: NgxPermissionsService,
    private dtoService: DtoService
  ){
    // Устанавливает начальные права
    permissionsService.addPermission(this.allPermisions.guest);
    this.currentUser = new BehaviorSubject(null);
  }

  public setCurrentJWT(token: string) {
    this.jwtToken = token;
  }
  public getCurrentJWT(): string {
    return this.jwtToken;
  }
  public getCurrentUserData(): BehaviorSubject<User> {
    return this.currentUser;
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

  public getUserData(id: string): Observable<User> {
    return this.restService.restGetUserData(id).pipe(
      map((obj: object) => {
        return this.dtoService.getUserFromObj(obj);
      }),
      catchError(this.restService.handleError<User>(`Get UserData #${id}`))
    );
  }

  public isAdmin(): boolean {
    /*  Самая "надежная проверка" на админа */
    let user: User = this.currentUser.getValue();
    return user.getRole().toLocaleLowerCase() === 'admin';
  }
}
