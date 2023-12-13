import { createReducer, on } from '@ngrx/store';
import { PeopleListState, initialPeopleListState } from './people-list.state';
import { setPeopleListItems } from '../actions/people-list.actions';

export const PeopleListReducer = createReducer(
  initialPeopleListState,
  on(setPeopleListItems, (state, { ...peopleItems }): PeopleListState => ({
    ...state,
    ...peopleItems
  })),
);
