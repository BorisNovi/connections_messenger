import { Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { setProfileItems } from 'src/app/NgRx/actions/profile.action';
import { selectProfileItems } from 'src/app/NgRx/selectors/profile.selector';
import { catchError, of, switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { LocalService } from 'src/app/core/services/local.service';
import { CookieService } from 'src/app/core/services/cookie.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ApiProfileService } from '../../services/api-profile.service';
import { IProfileResponse } from '../../models/profile-response.model';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  public nameForm!: FormGroup;
  userData!: IProfileResponse;
  isUpdatable = false;
  isUpdButtonDisabled = false;
  isSignoutButtonDisabled = false;

  constructor(
    private apiProfileService: ApiProfileService,
    private destroyRef: DestroyRef,
    private formBuilder: FormBuilder,
    private store: Store,
    private router: Router,
    private localService: LocalService,
    private cookieService: CookieService,
    private notificationService: NotificationService
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
          this.notificationService.openSnackBar(err.error.message || 'No Internet connection!');
          this.clearAll();
          this.router.navigate(['/signin']);
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
      this.isUpdButtonDisabled = true;
      this.apiProfileService.changeProfileData(formData.name)
        .pipe(
          catchError((err) => {
            this.notificationService.openSnackBar(err.error.message || 'No Internet connection!');
            return of();
          }),
          takeUntilDestroyed(this.destroyRef)
        )
        .subscribe(() => {
          this.isUpdButtonDisabled = false;
          const updatedProfileItems = { ...this.userData, name: { S: formData.name } };
          this.store.dispatch(setProfileItems({ profileItems: updatedProfileItems }));
          this.notificationService.openSnackBar('Name updated successfully!');
        });
    }
  }

  clearAll(): void {
    this.localService.clearData();
    this.cookieService.clearData();
  }

  cancelUpdateName(): void {
    this.isUpdatable = false;
  }

  signOut(): void {
    this.isSignoutButtonDisabled = true;
    this.apiProfileService.signoutUser()
      .pipe(
        catchError((err) => {
          this.notificationService.openSnackBar(err.error.message || 'No Internet connection!');
          this.clearAll();
          this.router.navigate(['/signin']);
          return of();
        }),
        takeUntilDestroyed(this.destroyRef)
      ).subscribe(() => {
        this.notificationService.openSnackBar('Sign out successful!');
        this.clearAll();
        this.isSignoutButtonDisabled = false;
        this.router.navigate(['/signin']);
      });
  }
}
