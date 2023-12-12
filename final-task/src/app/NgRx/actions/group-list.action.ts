import { createAction, props } from '@ngrx/store';
import { IGroupItem } from 'src/app/main/models/group-list-response.model';

export const setGroupListItems = createAction('[GROUP LIST] set', props<{ groupItems: IGroupItem[] }>());
