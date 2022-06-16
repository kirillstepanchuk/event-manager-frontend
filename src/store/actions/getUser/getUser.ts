import { UserData } from '../../../types/user';
import { GetCurrentUserActionTypes } from '../../actionTypes';

export interface GetCurrentUserAction {
  type: GetCurrentUserActionTypes.GET_CURRENT_USER,
}

interface GetCurrentUserSuccessAction {
  type: GetCurrentUserActionTypes.GET_CURRENT_USER_SUCCESS,
  payload: UserData | null,
}

interface GetCurrentUserFailedAction {
  type: GetCurrentUserActionTypes.GET_CURRENT_USER_ERROR,
  payload: string,
}

export type GetCurrentUserActions =
GetCurrentUserAction | GetCurrentUserSuccessAction | GetCurrentUserFailedAction;

const getCurrentUser = (): GetCurrentUserAction => ({
  type: GetCurrentUserActionTypes.GET_CURRENT_USER,
});

export const getCurrentUserSuccess = (user: UserData | null): GetCurrentUserSuccessAction => ({
  type: GetCurrentUserActionTypes.GET_CURRENT_USER_SUCCESS,
  payload: user,
});

export const getCurrentUserFailed = (error: string): GetCurrentUserFailedAction => ({
  type: GetCurrentUserActionTypes.GET_CURRENT_USER_ERROR,
  payload: error,
});

export default getCurrentUser;
