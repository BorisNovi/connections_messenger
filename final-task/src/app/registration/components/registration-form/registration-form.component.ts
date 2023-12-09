import { Component, DestroyRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, of } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
  errorHint = ''; // Это должно идти в снэкбар

  constructor(
    private formBuilder: FormBuilder,
    private registrationService: ApiRegistrationService,
    private destroyRef: DestroyRef,
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required, Validators.maxLength(40), Validators.pattern('^[a-zA-Z\\s]+$')]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]+$')]]
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.isButtonDisabled = true;
      this.registrationService.registerUser(this.registerForm.value)
        .pipe(
          catchError((err) => {
            this.errorHint = err.error.message; // Эти ошибки
            return of(null);
          }),
          takeUntilDestroyed(this.destroyRef)
        )
        .subscribe(() => {
          this.isButtonDisabled = false;
        });

      // TODO: добавить ошибки в снэкбар. Добавить редирек на успешную регистрацию
    }
  }
}
