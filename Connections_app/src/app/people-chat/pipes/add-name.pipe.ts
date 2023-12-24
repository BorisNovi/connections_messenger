import { Pipe, PipeTransform } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  Observable, map
} from 'rxjs';
import { selectPeopleListItems } from 'src/app/NgRx/selectors/people-list.selector';

@Pipe({
  name: 'addName'
})
export class AddNamePipe implements PipeTransform {
  constructor(
    private store: Store,
  ) { }

  transform(authorID: string): Observable<string> {
    return this.store.select(selectPeopleListItems)
      .pipe(
        // eslint-disable-next-line @ngrx/avoid-mapping-selectors
        map((people) => {
          const matchingPerson = people.find((person) => person.uid.S === authorID);
          return matchingPerson ? matchingPerson.name.S : '';
        })
      );
  }
}
