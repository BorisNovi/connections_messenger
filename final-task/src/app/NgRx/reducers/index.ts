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
import { PeopleListState, ConversationListState } from './people-list.state';
import { PeopleListReducer, ConversationListReducer } from './people-list.reducer';

export interface State {
  profile: ProfileState,
  groups: GroupListState,
  people: PeopleListState,
  conversations: ConversationListState
}

export const reducers: ActionReducerMap<State> = {
  profile: profileReducer,
  groups: GroupListReducer,
  people: PeopleListReducer,
  conversations: ConversationListReducer
};

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
