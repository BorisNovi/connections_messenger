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
import { GroupListState } from './group-list.state';
import { GroupListReducer } from './group-list.reducer';

export interface State {
  profile: ProfileState
  groups: GroupListState
}

export const reducers: ActionReducerMap<State> = {
  profile: profileReducer,
  groups: GroupListReducer
};

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
