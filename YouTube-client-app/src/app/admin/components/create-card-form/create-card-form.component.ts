import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-card-form',
  templateUrl: './create-card-form.component.html',
  styleUrls: ['./create-card-form.component.scss']
})
export class CreateCardFormComponent {
  card = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    img: new FormControl('', [Validators.required]),
    link: new FormControl('', [Validators.required]),
  });

  isHidden = true;

  constructor(
    // private loginService: LoginService,
  ) {}

  onSubmit(): void {
    if (this.card.valid) {
      // this.loginService.updLoginCredentials({
      //   login: this.credentials.value.login || null,
      //   password: this.credentials.value.password || null
      // });
    }
  }
}
