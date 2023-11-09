import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  credentials = new FormGroup({
    login: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  hide = true;

  constructor(
    private loginService: LoginService
  ) {}

  getLoginErrorMessage() {
    if (this.credentials.get('login')?.hasError('required')) {
      return 'You must enter a login';
    }

    return this.credentials.get('login')?.hasError('minlength') ? 'Min length 3 chars' : '';
  }

  getPasswordErrorMessage() {
    if (this.credentials.get('password')?.hasError('required')) {
      return 'You must enter a password';
    }

    return this.credentials.get('password')?.hasError('minlength') ? 'Min length 6 chars' : '';
  }

  onSubmit() {
    if (this.credentials.valid) {
      this.loginService.updLoginCredentials({
        login: this.credentials.value.login || null,
        password: this.credentials.value.password || null
      });
    }
  }
}
