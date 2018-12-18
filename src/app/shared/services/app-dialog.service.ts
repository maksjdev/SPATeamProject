import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';

@Injectable()
export class AppDialogService {

  constructor() { }

  public confirmDialog(message?: string): Observable<boolean> {
    const confirmation = confirm(message || 'Ты уверен(-а)?');
    return of(confirmation);
  };
}
