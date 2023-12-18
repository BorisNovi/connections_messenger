import { createAction, props } from '@ngrx/store';
import { IPeopleItem, IConversationItem } from 'src/app/main/models/people-list-response.model';

export const setPeopleListItems = createAction('[PEOPLE LIST] set', props<{ peopleItems: IPeopleItem[] }>());

export const setConversationListItems = createAction('[CONVERSATION LIST] set', props<{ conversationItems: IConversationItem[] }>());

export const setFullPeopleItems = createAction(
  '[FULL PEOPLE LIST] set',
  props<{ peopleItems: IPeopleItem[], conversationItems: IConversationItem[] }>()
);

export const deleteConversationListItem = createAction('[CONVERSATION LIST] delete', props<{ conversationID: string }>());
