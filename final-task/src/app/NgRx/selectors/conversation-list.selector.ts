import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ConversationListState } from '../reducers/people-list.state';

export const selectFeatureConversationListItems = createFeatureSelector<ConversationListState>('conversations');

export const selectConversationListItems = createSelector(
  selectFeatureConversationListItems,
  (state) => state.conversationItems
);
