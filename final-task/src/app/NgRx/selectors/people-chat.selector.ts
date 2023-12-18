import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PeopleChatState } from '../reducers/people-chat.state';

export const selectFeatureChat = createFeatureSelector<PeopleChatState>('peopleChats');

export const selectPeopleChatMessages = createSelector(
  selectFeatureChat,
  (state) => state.peopleChats
);

export const selectMessagesByConversationID = (conversationID: string) => createSelector(
  selectPeopleChatMessages,
  (peopleChats) => peopleChats?.[conversationID] || []
);
