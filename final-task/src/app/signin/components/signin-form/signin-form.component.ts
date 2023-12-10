import { Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {
  catchError, combineLatest, of, tap
} from 'rxjs';
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
  delay = 2000;

  constructor(
    private formBuilder: FormBuilder,
    private signInService: ApiSignInService,
    private destroyRef: DestroyRef,
    private snackBar: MatSnackBar,
    private router: Router,
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
            this.openSnackBar('Sign in successful!');
            setTimeout(() => this.router.navigate(['/']), this.delay);
          }),
          catchError((err) => {
            this.openSnackBar(err.error.message);
            return of(null);
          }),
          takeUntilDestroyed(this.destroyRef)
        )
        .subscribe((data) => console.log(data));
      // TODO: Добавиь сервис для хранения токена, id и пошты в локалке и получения оттуда
    }
  }

  openSnackBar(message: string): void {
    this.snackBar.open(message, 'Ok', { duration: this.delay });
  }
}
