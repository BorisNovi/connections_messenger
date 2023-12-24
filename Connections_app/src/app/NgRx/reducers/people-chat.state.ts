import { IPeopleMessageItem } from 'src/app/people-chat/models/people-chat-messages-response.model';

export interface PeopleChatState {
  peopleChats: { [conversationID: string]: IPeopleMessageItem[] } | null
}

export const initialPeopleChatState: PeopleChatState = {
  peopleChats: null,
};
