import { createReducer, on } from '@ngrx/store';
import { PeopleChatState, initialPeopleChatState } from './people-chat.state';
import { addPeopleChatMessage, addPeopleChatMessages, getPeopleChatMessages } from '../actions/people-chat.action';

export const PeopleChatReducer = createReducer(
  initialPeopleChatState,
  on(getPeopleChatMessages, (state, { peopleChats }): PeopleChatState => {
    const newItems = { ...state.peopleChats, ...peopleChats };

    return { ...state, peopleChats: newItems };
  }),
  on(addPeopleChatMessage, (state, { payload }): PeopleChatState => {
    const { conversationID, message } = payload;
    const existingMessages = state.peopleChats?.[conversationID] || [];
    const updatedChats = { ...state.peopleChats, [conversationID]: [...existingMessages, message] };
    return { ...state, peopleChats: updatedChats };
  }),
  on(addPeopleChatMessages, (state, { payload }): PeopleChatState => {
    const { conversationID, messages } = payload;
    const existingMessages = state.peopleChats?.[conversationID] || [];
    const updatedChats = {
      ...state.peopleChats, [conversationID]: [...existingMessages, ...messages]
    };
    return { ...state, peopleChats: updatedChats };
  }),
);
