import { UserData } from '../../../types/user';
import { ConfirmUserActionTypes } from '../../actionTypes';

export interface ConfirmUserAction {
  type: ConfirmUserActionTypes.CONFIRM_USER,
  payload: string
}

interface ConfirmUserSuccessAction {
  type: ConfirmUserActionTypes.CONFIRM_USER_SUCCESS,
  payload: UserData | null,
}

interface ConfirmUserFailedAction {
  type: ConfirmUserActionTypes.CONFIRM_USER_ERROR,
  payload: string,
}

export type ConfirmUserActions =
ConfirmUserAction | ConfirmUserSuccessAction | ConfirmUserFailedAction;

const confirmUser = (token: string): ConfirmUserAction => ({
  type: ConfirmUserActionTypes.CONFIRM_USER,
  payload: token,
});

export const confirmUserSuccess = (user: UserData | null): ConfirmUserSuccessAction => ({
  type: ConfirmUserActionTypes.CONFIRM_USER_SUCCESS,
  payload: user,
});

export const confirmUserFailed = (error: string): ConfirmUserFailedAction => ({
  type: ConfirmUserActionTypes.CONFIRM_USER_ERROR,
  payload: error,
});

export default confirmUser;
