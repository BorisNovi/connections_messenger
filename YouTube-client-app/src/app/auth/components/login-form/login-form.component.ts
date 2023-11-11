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

  isHidden = true;

  constructor(
    private loginService: LoginService
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
