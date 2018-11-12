import { FormControl, Validators } from '@angular/forms';

// setup simple regex for white listed characters
const validCharacters = /[^\s\w,.:&\/()+%'`@-]/;

export class CustomValidators extends Validators {

  static validateCharacters(regExp?: RegExp) {
    return function (control: FormControl) {
      if (control.value && control.value.length > 0) {
        // match the control value against the regular expression
        const matches = control.value.match(regExp || validCharacters);
        // if there are matches return an object, else return null.
        return matches && matches.length ? { invalid_characters: matches } : null;
      }
      return null;
    }
  }

  static validateLimits (min?: number, max?: number) {
    return function (control: FormControl) {
      let value = control.value, result = {};
      (value && min && value.length < min) ? result['invalid_min'] = min : null;
      (value && max && value.length > max) ? result['invalid_max'] = max: null;
      return result;
    }
  }

  static validateBoolean(expected: boolean) {
    return function (control: FormControl) {
      return control.value === expected ? null : { invalid_expected: expected };
    }
  }
}
