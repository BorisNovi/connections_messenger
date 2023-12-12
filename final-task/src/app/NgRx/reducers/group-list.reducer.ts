import { createReducer, on } from '@ngrx/store';
import { GroupListState, initialGroupListState } from './group-list.state';
import { setGroupListItems } from '../actions/group-list.action';

export const GroupListReducer = createReducer(
  initialGroupListState,
  on(setGroupListItems, (state, { ...groupItems }): GroupListState => ({
    ...state,
    ...groupItems
  })),
);
