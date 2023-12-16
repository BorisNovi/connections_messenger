import { IGroupMessageItem } from 'src/app/group-chat/models/group-chat-messages-response.model';

export interface GroupChatState {
  groupChats: { [groupID: string]: IGroupMessageItem[] } | null
}

export const initialGroupChatState: GroupChatState = {
  groupChats: null,
};
