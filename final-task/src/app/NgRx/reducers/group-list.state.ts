import { IGroupItem } from 'src/app/main/models/group-list-response.model';

export interface GroupListState {
  groupItems: IGroupItem[]
}

export const initialGroupListState: GroupListState = {
  groupItems: [],
};
