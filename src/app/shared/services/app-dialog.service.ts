import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {IndividualConfig, ToastrService} from 'ngx-toastr';

@Injectable()
export class AppDialogService {

  constructor(
    private toastr: ToastrService
  ) { }

  public confirmDialog(message?: string): Observable<boolean> {
    const confirmation = confirm(message || 'Ты уверен(-а)?');
    return of(confirmation);
  };

  showToastSuccess(text: string, title: string = 'Операция успешна!', options?: Partial<IndividualConfig>) {
    this.toastr.success(text, title, options);
  }
  showToastInfo(text: string, title: string = 'Приймите к сведению:', options?: Partial<IndividualConfig>) {
    this.toastr.info(text, title, options);
  }
  showToastWarning(text: string, title: string = 'Что-то не так..', options?: Partial<IndividualConfig>) {
    this.toastr.warning(text, title, options);
  }
  showToastError(text: string, title: string = 'Операция не удалась!', options?: Partial<IndividualConfig>) {
    this.toastr.error(text, title, options);
  }
}
