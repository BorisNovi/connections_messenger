import { createAction, props } from '@ngrx/store';
import { IPeopleItem } from 'src/app/main/models/people-list-response.model';

export const setPeopleListItems = createAction('[PEOPLE LIST] set', props<{ peopleItems: IPeopleItem[] }>());
