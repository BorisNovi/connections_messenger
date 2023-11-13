import { Directive } from '@angular/core';
import {
  AbstractControl, NG_VALIDATORS, ValidationErrors, Validator
} from '@angular/forms';

@Directive({
  selector: '[appPasswordValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: PasswordValidatorDirective,
    multi: true
  }]
})
export class PasswordValidatorDirective implements Validator {
  public validate(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }

    const password = control.value;

    const isAtLeastEightCharacters = password.length >= 8;

    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const isMixedCase = hasUppercase && hasLowercase;

    const hasLettersAndNumbers = /[a-zA-Z].*\d|\d.*[a-zA-Z]/.test(password);

    const hasSpecialCharacter = /[%$☲!#]/.test(password);

    const errors: ValidationErrors = {};

    if (!isAtLeastEightCharacters) {
      errors['atLeastEightCharacters'] = true;
    }

    if (!isMixedCase) {
      errors['mixedCase'] = true;
    }

    if (!hasLettersAndNumbers) {
      errors['lettersAndNumbers'] = true;
    }

    if (!hasSpecialCharacter) {
      errors['specialCharacter'] = true;
    }

    return Object.keys(errors).length === 0 ? null : errors;
  }
}
