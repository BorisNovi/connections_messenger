import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';

import { ProfileState } from './profile.state';
import { profileReducer } from './profile.reducer';

export interface State {
  profile: ProfileState
}

export const reducers: ActionReducerMap<State> = {
  profile: profileReducer,
};

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
