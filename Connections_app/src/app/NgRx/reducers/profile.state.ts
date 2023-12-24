import { IProfileResponse } from 'src/app/profile/models/profile-response.model';

export interface ProfileState {
  profileItems: IProfileResponse | null
}

export const initialProfileState: ProfileState = {
  profileItems: null,
};
