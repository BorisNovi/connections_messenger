import { Component, DestroyRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, of, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ApiRegistrationService } from '../../services/api-registration.service';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {
  public registerForm!: FormGroup;
  isHidden = true;
  isButtonDisabled = false;
  lastErrorEmail = '';

  constructor(
    private formBuilder: FormBuilder,
    private registrationService: ApiRegistrationService,
    private destroyRef: DestroyRef,
    private notificationService: NotificationService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required, Validators.maxLength(40), Validators.pattern('^[a-zA-Z\\s]+$')]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]+$')]]
    });

    this.registerForm.get('email')?.valueChanges.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((email) => {
      if (this.lastErrorEmail !== email) {
        this.isButtonDisabled = false;
      } else {
        this.isButtonDisabled = true;
      }
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.isButtonDisabled = true;
      this.registrationService.registerUser(this.registerForm.value)
        .pipe(
          tap(() => {
            this.notificationService.openSnackBar('Registration successful!');
            this.router.navigate(['signin']);
          }),
          catchError((err) => {
            this.notificationService.openSnackBar(err.error.message || 'No Internet connection!');
            if (err.error.type === 'PrimaryDuplicationException') {
              this.lastErrorEmail = this.registerForm.get('email')?.value;
            }
            return of(null);
          }),
          takeUntilDestroyed(this.destroyRef)
        )
        .subscribe();
    }
  }
}
