import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  login = new FormControl('', [Validators.required, Validators.minLength(3)]);
  password = new FormControl('', [Validators.required, Validators.minLength(6)]);
  hide = true;

  constructor(
    private loginService: LoginService
  ) {}

  getLoginErrorMessage() {
    if (this.login.hasError('required')) {
      return 'You must enter a login';
    }

    return this.login.hasError('minlength') ? 'Min length 3 chars' : '';
  }

  getPasswordErrorMessage() {
    if (this.password.hasError('required')) {
      return 'You must enter a password';
    }

    return this.password.hasError('minlength') ? 'Min length 6 chars' : '';
  }

  onSubmit() {
    if ((this.login.valid && this.password.valid)
     && (this.login.value !== null && this.password.value !== null)) {
      this.loginService.updLoginCredentials({
        login: this.login.value,
        password: this.password.value
      });
    }
  }
}
