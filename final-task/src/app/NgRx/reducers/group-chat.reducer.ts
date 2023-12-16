import { createReducer, on } from '@ngrx/store';
import { GroupChatState, initialGroupChatState } from './group-chat.state';
import { addGroupChatMessage, getGroupChatMessages } from '../actions/group-chat.action';

export const GroupChatReducer = createReducer(
  initialGroupChatState,
  on(getGroupChatMessages, (state, { groupChats }): GroupChatState => {
    const newItems = { ...state.groupChats, ...groupChats };

    return { ...state, groupChats: newItems };
  }),
  on(addGroupChatMessage, (state, { payload }): GroupChatState => {
    const { groupID, message } = payload;
    const existingMessages = state.groupChats?.[groupID] || [];
    const updatedGroup = { ...state.groupChats, [groupID]: [...existingMessages, message] };
    return { ...state, groupChats: updatedGroup };
  })
);
