import { Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { setProfileItems } from 'src/app/NgRx/actions/profile.action';
import { selectProfileItems } from 'src/app/NgRx/selectors/profile.selector';
import { of, switchMap } from 'rxjs';
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

  constructor(
    private apiProfileService: ApiProfileService,
    private destroyRef: DestroyRef,
    private formBuilder: FormBuilder,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.nameForm = this.formBuilder.group({
      name: ['', [Validators.required]],
    });

    this.store.select(selectProfileItems)
      .pipe(
        switchMap((profileData) => (profileData?.createdAt
          ? of(profileData)
          : this.apiProfileService.getProfileData())),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((data) => {
        this.userData = data;
        this.store.dispatch(setProfileItems({ profileItems: data }));
      });
  }

  updateName(): void {
    this.isUpdatable = !this.isUpdatable;
  }

  onSubmit(): void {
    if (this.nameForm.valid) {
      console.log(this.nameForm.value);
    }
  }
}
