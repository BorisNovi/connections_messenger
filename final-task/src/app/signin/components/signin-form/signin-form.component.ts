import { Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

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
    // private signInService: ApiSignInService,
    private destroyRef: DestroyRef,
    private snackBar: MatSnackBar,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.signInForm.valid) {
      console.log(this.signInForm.value);
      this.openSnackBar('msg');
      // this.isButtonDisabled = true;
      // this.registrationService.registerUser(this.registerForm.value)
      //   .pipe(
      //     tap(() => {
      //       this.openSnackBar('Registration successful!');
      //       setTimeout(() => this.router.navigate(['/']), this.delay);
      //     }),
      //     catchError((err) => {
      //       this.openSnackBar(err.error.message);
      //       if (err.error.type === 'PrimaryDuplicationException') {
      //         this.lastErrorEmail = this.registerForm.get('email')?.value;
      //       }
      //       return of(null);
      //     }),
      //     takeUntilDestroyed(this.destroyRef)
      //   )
      //   .subscribe();
    }
  }

  openSnackBar(message: string): void {
    this.snackBar.open(message, 'Ok', { duration: this.delay });
  }
}
