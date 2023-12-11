import { Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ApiProfileService } from '../../services/api-profile.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  constructor(private apiProfileService: ApiProfileService, private destroyRef: DestroyRef,) {}
  ngOnInit(): void {
    this.apiProfileService.getProfileData()
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((data) => console.log(data));
  }
}
