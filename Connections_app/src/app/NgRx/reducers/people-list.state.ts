import { IPeopleItem, IConversationItem } from 'src/app/main/models/people-list-response.model';

export interface PeopleListState {
  peopleItems: IPeopleItem[]
}

export const initialPeopleListState: PeopleListState = {
  peopleItems: [],
};

export interface ConversationListState {
  conversationItems: IConversationItem[]
}

export const initialConversationListState: ConversationListState = {
  conversationItems: [],
};
