import { createReducer, on } from '@ngrx/store';
import {
  PeopleListState, initialPeopleListState, ConversationListState, initialConversationListState
} from './people-list.state';
import {
  setPeopleListItems,
  setConversationListItems,
  setFullPeopleItems,
  deleteConversationListItem,
  addConversationListItem
} from '../actions/people-list.actions';

export const PeopleListReducer = createReducer(
  initialPeopleListState,
  on(setPeopleListItems, (state, { peopleItems }): PeopleListState => ({
    ...state,
    peopleItems
  })),
  on(setFullPeopleItems, (state, { peopleItems }): PeopleListState => ({
    ...state,
    peopleItems
  })),
);

export const ConversationListReducer = createReducer(
  initialConversationListState,
  on(setConversationListItems, (state, { conversationItems }): ConversationListState => ({
    ...state,
    conversationItems
  })),
  on(setFullPeopleItems, (state, { conversationItems }): ConversationListState => ({
    ...state,
    conversationItems
  })),
  on(deleteConversationListItem, (state, { conversationID }): ConversationListState => {
    const updatedConversationListItems = state.conversationItems
      .filter((item) => item.id.S !== conversationID);

    return {
      ...state,
      conversationItems: [...updatedConversationListItems]
    };
  }),
  on(addConversationListItem, (state, { conversationItem }): ConversationListState => {
    const updatedConversationListItems = [...state.conversationItems, conversationItem];

    return {
      ...state,
      conversationItems: [...updatedConversationListItems]
    };
  })
);
