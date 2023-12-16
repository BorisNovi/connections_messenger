import { createAction, props } from '@ngrx/store';
import { IGroupMessageItem } from 'src/app/group-chat/models/group-chat-messages-response.model';

export const getGroupChatMessages = createAction('[GROUP CHAT MESSAGES] addChat&messages', props<{ groupChats: { [id: string]: IGroupMessageItem[] } }>());
export const addGroupChatMessage = createAction('[GROUP CHAT MESSAGES] addMessageToChat', props<{ payload: { groupID: string, message: IGroupMessageItem } }>());
export const addGroupChatMessages = createAction('[GROUP CHAT MESSAGES] addMessagesToChat', props<{ payload: { groupID: string, messages: IGroupMessageItem[] } }>());
