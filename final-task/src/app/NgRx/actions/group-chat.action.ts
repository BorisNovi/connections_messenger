import { createAction, props } from '@ngrx/store';
import { IGroupMessageItem } from 'src/app/group-chat/models/group-chat-messages-response.model';

export const getGroupChatMessages = createAction('[GROUP CHAT MESSAGES] addMessages', props<{ groupChats: { [id: string]: IGroupMessageItem[] } }>());
export const addGroupChatMessage = createAction('[GROUP CHAT MESSAGES] addMessage', props<{ payload: { groupID: string, message: IGroupMessageItem } }>());
