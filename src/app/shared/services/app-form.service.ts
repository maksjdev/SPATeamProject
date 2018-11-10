import { Injectable } from '@angular/core';
import {FormGroup} from '@angular/forms';

@Injectable()
export class AppFormService {

  // get all values of the formGroup, loop over them
  // then mark each field as touched
  public markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control['controls']) {
        control['controls'].forEach(c => this.markFormGroupTouched(c));
      }
    });
  }

  // Возвращает массив ошибок
  public validationMessages() {
    const messages = {
      required: 'Это поле необходимо!',
      email: 'Данный email адрес не коректен!',
      requiredTrue: 'Подтвердите данный пункт..',
      invalid_min: (min: number) => {
        return `Минимальная длинна (${min}) - не достигнута!`;
      },
      invalid_max: (max: number) => {
        return `Максимальная длинна (${max}) - превышена!`;
      },
      invalid_characters: (matches: any[]) => {
        let matchedCharacters = matches;

        matchedCharacters = matchedCharacters.reduce((characterString, character, index) => {
          let string = characterString;
          string += character;
          if (matchedCharacters.length !== index + 1) {
            string += ', ';
          }
          return string;
        }, '');
        return `Эти символы - запрещены: ${matchedCharacters}`;
      },
    };
    return messages;
  }

  // Validate form instance
  // check_dirty true will only emit errors if the field is touched
  // check_dirty false will check all fields independent of
  // being touched or not. Use this as the last check before submitting
  public validateForm(formToValidate: FormGroup, formErrors: any, checkDirty?: boolean, checkField = {}) {
    const form = formToValidate;

    for (const field in formErrors) {
      if (field) {
        formErrors[field] = '';
        const control = form.get(field);
        const messages = this.validationMessages();
        if (control && !control.valid) {
          if (!checkDirty || (control.dirty || control.touched || checkField[field])) {
            control.markAsTouched();
            for (const key in control.errors) {
              if (key && key !== 'invalid_characters' && key !== 'invalid_min' && key !== 'invalid_max') {
                formErrors[field] = formErrors[field] || messages[key];
              } else {
                formErrors[field] = formErrors[field] || messages[key](control.errors[key]);
              }
            }
          }
        }
      }
    }
    return formErrors;
  }
}
