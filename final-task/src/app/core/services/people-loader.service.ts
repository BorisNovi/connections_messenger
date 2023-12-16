import { DestroyRef, Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { setPeopleListItems } from 'src/app/NgRx/actions/people-list.actions';
import { ApiCommonService } from './api-common.service';

@Injectable({
  providedIn: 'root'
})
export class PeopleLoaderService {
  constructor(
    private store: Store,
    private apiCommon: ApiCommonService,
    private destroyRef: DestroyRef
  ) { }

  savePeopleList(): void {
    this.apiCommon.getUsersList()
      .pipe(
        catchError((err) => {
          // eslint-disable-next-line no-console
          console.log(err);
          return of();
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((peopleData) => {
        this.store.dispatch(setPeopleListItems({ peopleItems: peopleData.Items }));
      });
  }
}
