import { Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { setProfileItems } from 'src/app/NgRx/actions/profile.action';
import { selectProfileItems } from 'src/app/NgRx/selectors/profile.selector';
import { catchError, of, switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiProfileService } from '../../services/api-profile.service';
import { IProfileResponse } from '../../models/profile-response.model';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  public nameForm!: FormGroup;
  delay = 2000;
  userData!: IProfileResponse;
  isUpdatable = false;
  isButtonDisabled = false;

  constructor(
    private apiProfileService: ApiProfileService,
    private destroyRef: DestroyRef,
    private formBuilder: FormBuilder,
    private store: Store,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.nameForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(40), Validators.pattern('^[a-zA-Z\\s]+$')]],
    });

    this.getProfileData();
  }

  getProfileData(): void {
    this.store.select(selectProfileItems)
      .pipe(
        switchMap((profileData) => (profileData?.createdAt
          ? of(profileData)
          : this.apiProfileService.getProfileData())),
        catchError((err) => {
          this.openSnackBar(err.error.message || 'No Internet connection!');
          return of();
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((data) => {
        this.userData = data;
        this.store.dispatch(setProfileItems({ profileItems: data }));
      });
  }

  updateName(): void {
    this.isUpdatable = !this.isUpdatable;
    const formData = this.nameForm.value;

    if (!this.isUpdatable && this.nameForm.valid) {
      this.isButtonDisabled = true;
      this.apiProfileService.changeProfileData(formData.name)
        .pipe(
          catchError((err) => {
            this.openSnackBar(err.error.message || 'No Internet connection!');
            return of();
          }),
          takeUntilDestroyed(this.destroyRef)
        )
        .subscribe(() => {
          this.isButtonDisabled = false;
          const updatedProfileItems = { ...this.userData, name: { S: formData.name } };
          this.store.dispatch(setProfileItems({ profileItems: updatedProfileItems }));
        });
    }
  }

  cancelUpdateName(): void {
    this.isUpdatable = false;
  }

  openSnackBar(message: string): void {
    this.snackBar.open(message, 'Ok', { duration: this.delay });
  }
}
