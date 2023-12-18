import { createAction, props } from '@ngrx/store';
import { IPeopleMessageItem } from 'src/app/people-chat/models/people-chat-messages-response.model';

export const getPeopleChatMessages = createAction('[PEOPLE CHAT MESSAGES] addChat&messages', props<{ peopleChats: { [id: string]: IPeopleMessageItem[] } }>());
export const addPeopleChatMessage = createAction('[PEOPLE CHAT MESSAGES] addMessageToChat', props<{ payload: { conversationID: string, message: IPeopleMessageItem } }>());
export const addPeopleChatMessages = createAction('[PEOPLE CHAT MESSAGES] addMessagesToChat', props<{ payload: { conversationID: string, messages: IPeopleMessageItem[] } }>());
