import { Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  catchError, combineLatest, of, tap
} from 'rxjs';
import { LocalService } from 'src/app/core/services/local.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ApiSignInService } from '../../services/api-signin.service';

@Component({
  selector: 'app-signin-form',
  templateUrl: './signin-form.component.html',
  styleUrls: ['./signin-form.component.scss']
})
export class SigninFormComponent implements OnInit {
  public signInForm!: FormGroup;
  isHidden = true;
  isButtonDisabled = false;

  constructor(
    private formBuilder: FormBuilder,
    private signInService: ApiSignInService,
    private localService: LocalService,
    private destroyRef: DestroyRef,
    private router: Router,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

    combineLatest({
      email: this.signInForm.get('email')?.valueChanges || '',
      password: this.signInForm.get('password')?.valueChanges || ''
    }).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(() => {
      this.isButtonDisabled = false;
    });
  }

  onSubmit(): void {
    if (this.signInForm.valid) {
      this.isButtonDisabled = true;
      this.signInService.signinUser(this.signInForm.value)
        .pipe(
          tap(() => {
            this.notificationService.openSnackBar('Sign in successful!');
            this.router.navigate(['/']);
          }),
          catchError((err) => {
            this.notificationService.openSnackBar(err.error.message || 'No Internet connection!');
            return of(null);
          }),
          takeUntilDestroyed(this.destroyRef)
        )
        .subscribe((data) => {
          if (data) {
            this.localService.saveData('email', this.signInForm.value.email);
            this.localService.saveData('token', data?.token);
            this.localService.saveData('uid', data?.uid);
          }
        });
    }
  }
}
