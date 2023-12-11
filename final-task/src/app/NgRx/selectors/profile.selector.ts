import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProfileState } from '../reducers/profile.state';

export const selectFeatureProfileItems = createFeatureSelector<ProfileState>('profile');

export const selectProfileItems = createSelector(
  selectFeatureProfileItems,
  (state) => state.profileItems
);
