import { Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiProfileService } from '../../services/api-profile.service';
import { IProfileResponse } from '../../models/prifile-response.model';

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
  ) {}

  ngOnInit(): void {
    this.nameForm = this.formBuilder.group({
      name: ['', [Validators.required]],
    });

    this.apiProfileService.getProfileData()
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((data) => {
        this.userData = data;
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
