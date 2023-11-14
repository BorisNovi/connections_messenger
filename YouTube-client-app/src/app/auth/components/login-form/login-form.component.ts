import { Component } from '@angular/core';
import {
  AbstractControl, FormControl, FormGroup, ValidationErrors, Validators
} from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { PasswordValidatorDirective } from '../../directives/password-validator.directive';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  credentials = new FormGroup({
    login: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    password: new FormControl('', [Validators.required, this.passwordValidator])
  });

  passwordValidator(control: AbstractControl): ValidationErrors | null {
    return new PasswordValidatorDirective().validate(control);
  }

  isHidden = true;

  constructor(
    private loginService: LoginService,
  ) {}

  onSubmit(): void {
    if (this.credentials.valid) {
      this.loginService.updLoginCredentials({
        login: this.credentials.value.login || null,
        password: this.credentials.value.password || null
      });
    }
  }
}
