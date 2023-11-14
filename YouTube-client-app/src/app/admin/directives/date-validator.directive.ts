import { Directive } from '@angular/core';
import {
  AbstractControl, NG_VALIDATORS, ValidationErrors, Validator
} from '@angular/forms';

@Directive({
  selector: '[appDateValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: DateValidatorDirective,
    multi: true
  }]
})
export class DateValidatorDirective implements Validator {
  public validate(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }

    const date = new Date(control.value);
    const now = new Date();
    const youtubeLanunched = new Date('02.14.2005');

    const errors: ValidationErrors = {};

    if (date >= now) {
      errors['futureDate'] = true;
    }

    if (date <= youtubeLanunched) {
      errors['launchedDate'] = true;
    }

    return Object.keys(errors).length === 0 ? null : errors;
  }
}
