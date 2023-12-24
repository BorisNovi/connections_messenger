import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PeopleListState, ConversationListState } from '../reducers/people-list.state';

export const selectFeaturePeopleListItems = createFeatureSelector<PeopleListState>('people');

export const selectPeopleListItems = createSelector(
  selectFeaturePeopleListItems,
  (state) => state.peopleItems
);

export const selectFeatureConversationListItems = createFeatureSelector<ConversationListState>('conversations');

export const selectConversationListItems = createSelector(
  selectFeatureConversationListItems,
  (state) => state.conversationItems
);
