/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { GroupChatState } from './group-chat.state';
import { GroupChatReducer } from './group-chat.reducer';
import { PeopleChatState } from './people-chat.state';
import { PeopleChatReducer } from './people-chat.reducer';

export interface State {
  profile: ProfileState,
  groups: GroupListState,
  people: PeopleListState,
  conversations: ConversationListState,
  groupChats: GroupChatState,
  peopleChats: PeopleChatState
}

export const reducers: ActionReducerMap<State> = {
  profile: profileReducer,
  groups: GroupListReducer,
  people: PeopleListReducer,
  conversations: ConversationListReducer,
  groupChats: GroupChatReducer,
  peopleChats: PeopleChatReducer
};

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
