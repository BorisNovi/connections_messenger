import { createReducer, on } from '@ngrx/store';
import { GroupListState, initialGroupListState } from './group-list.state';
import { deleteGroupListItem, setGroupListItem, setGroupListItems } from '../actions/group-list.action';

export const GroupListReducer = createReducer(
  initialGroupListState,
  on(setGroupListItems, (state, { groupItems }): GroupListState => ({
    ...state,
    groupItems
  })),
  on(deleteGroupListItem, (state, { groupID }): GroupListState => {
    const updatedGroupItems = state.groupItems.filter((item) => item.id.S !== groupID);

    return {
      ...state,
      groupItems: [...updatedGroupItems]
    };
  }),
  on(setGroupListItem, (state, { groupItem }): GroupListState => {
    const updatedGroupItems = [...state.groupItems, groupItem];
    return {
      ...state,
      groupItems: updatedGroupItems
    };
  }),
);
