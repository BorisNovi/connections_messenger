import { createReducer, on } from '@ngrx/store';
import {
  PeopleListState, initialPeopleListState, ConversationListState, initialConversationListState
} from './people-list.state';
import { setPeopleListItems, setConversationListItems } from '../actions/people-list.actions';

export const PeopleListReducer = createReducer(
  initialPeopleListState,
  on(setPeopleListItems, (state, { ...peopleItems }): PeopleListState => ({
    ...state,
    ...peopleItems
  })),
);

export const ConversationListReducer = createReducer(
  initialConversationListState,
  on(setConversationListItems, (state, { ...conversationItems }): ConversationListState => ({
    ...state,
    ...conversationItems
  })),
);
