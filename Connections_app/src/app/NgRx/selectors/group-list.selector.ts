import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GroupListState } from '../reducers/group-list.state';

export const selectFeatureGroupListItems = createFeatureSelector<GroupListState>('groups');

export const selectGroupListItems = createSelector(
  selectFeatureGroupListItems,
  (state) => state.groupItems
);
