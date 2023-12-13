import { IPeopleItem } from 'src/app/main/models/people-list-response.model';

export interface PeopleListState {
  peopleItems: IPeopleItem[]
}

export const initialPeopleListState: PeopleListState = {
  peopleItems: [],
};
