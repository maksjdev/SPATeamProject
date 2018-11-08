import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loginState: boolean = true;

  constructor() { }

  public getLoginState():boolean {
    return this.loginState;
  }
}
