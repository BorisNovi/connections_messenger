import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PeopleListState } from '../reducers/people-list.state';

export const selectFeaturePeopleListItems = createFeatureSelector<PeopleListState>('people');

export const selectPeopleListItems = createSelector(
  selectFeaturePeopleListItems,
  (state) => state.peopleItems
);
