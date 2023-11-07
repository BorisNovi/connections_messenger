import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  login = new FormControl('', [Validators.required, Validators.minLength(3)]);
  password = new FormControl('', [Validators.required, Validators.minLength(6)]);
  hide = true;

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
    if (this.login.valid && this.password.valid) {
      console.log('Login:', this.login.value);
      console.log('Password:', this.password.value);
    }
  }
}
