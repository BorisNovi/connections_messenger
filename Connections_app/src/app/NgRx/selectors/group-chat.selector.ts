import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GroupChatState } from '../reducers/group-chat.state';

export const selectFeatureChat = createFeatureSelector<GroupChatState>('groupChats');

export const selectGroupChatMessages = createSelector(
  selectFeatureChat,
  (state) => state.groupChats
);

export const selectMessagesByGroupID = (groupID: string) => createSelector(
  selectGroupChatMessages,
  (groupChats) => groupChats?.[groupID] || []
);
