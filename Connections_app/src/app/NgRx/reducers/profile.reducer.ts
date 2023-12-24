import { createReducer, on } from '@ngrx/store';
import { ProfileState, initialProfileState } from './profile.state';
import { setProfileItems } from '../actions/profile.action';

export const profileReducer = createReducer(
  initialProfileState,
  on(setProfileItems, (state, { profileItems }): ProfileState => ({
    ...state,
    profileItems
  })),
);
