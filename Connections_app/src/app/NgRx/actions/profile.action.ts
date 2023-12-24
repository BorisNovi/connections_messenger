import { createAction, props } from '@ngrx/store';
import { IProfileResponse } from 'src/app/profile/models/profile-response.model';

export const setProfileItems = createAction('[PROFILE] set', props<{ profileItems: IProfileResponse }>());
