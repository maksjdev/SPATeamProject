import {Injectable} from '@angular/core';
import {User} from '@shared/models/User';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {AppRestService} from '@shared/http/app-rest.service';
import {NgxPermissionsService} from 'ngx-permissions';
import {DtoService} from '@shared/dto.service';
import {Category} from '@shared/models/Category';
import {AppDialogService} from '@shared/services/app-dialog.service';

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
    private dtoService: DtoService,
    private restService: AppRestService,
    private dialogService: AppDialogService,
    private permissionsService: NgxPermissionsService,
  ) {
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

  public setCurrentUserData(user: User) {
    this.currentUser.next(user);
    this.permissionsService.addPermission(this.allPermisions.user);
    if (this.isAdmin()) {
      this.permissionsService.addPermission(this.allPermisions.admin);
    }
  }
  public getCurrentUserData(): BehaviorSubject<User> {
    return this.currentUser;
  }

  public getUserData(id: string): Promise<User> {
    return this.restService.restGetUserData(id).pipe(
      map((obj: object) => {
        return this.dtoService.getUserFromObj(obj);
      }),
      catchError(this.restService.handleError<User>(`Get UserData #${id}`))
    ).toPromise();
  }
  public deleteCurrentUserData(): void {
    this.currentUser.next(null);
    this.setCurrentJWT(null);
    this.permissionsService.removePermission(this.allPermisions.user);
    if (this.permissionsService.hasPermission(this.allPermisions.admin)) {
      this.permissionsService.removePermission(this.allPermisions.admin);
    }
  }
  public reloadCurrentUserData(): void {
    let currentUser = this.getCurrentUserData().getValue();
    if (!currentUser) { return; }
    this.getUserData(currentUser.getId()).then( (user: User) => {
      if (user) this.setCurrentUserData(user);
    });
  }

  public hasBookmark(bookmarkId: string): boolean {
    let currentUser = this.getCurrentUserData().getValue();
    if (!currentUser) { return false; }
    return currentUser.getBookmarks().some((value: string) => {
      return value === bookmarkId;
    });
  }
  public addToBookmarks(newsId: string): Promise<boolean>{
    return this.restService.restAddBookmark(newsId).pipe(
      catchError((errorMsg: string) => {
        this.dialogService.showToastError(errorMsg);
        return of(errorMsg);
      })
    ).toPromise().then(value => {
      return value === Object(value);
    })
  }
  public deleteFromBookmarks(newsId: string): Promise<boolean>{
    return this.restService.restDeleteBookmark(newsId).pipe(
      catchError((errorMsg: string) => {
        this.dialogService.showToastError(errorMsg);
        return of(errorMsg);
      })
    ).toPromise().then(value => {
      return value === Object(value);
    })
  }

  public isAdmin(): boolean {
    /*  Самая "надежная проверка" на админа */
    let user: User = this.currentUser.getValue();
    return user.getRole().toLocaleLowerCase() === 'admin';
  }
}
