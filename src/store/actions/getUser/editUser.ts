import { EditUserData, UserData } from '../../../types/user';
import { EditUserActionTypes } from '../../actionTypes';

export interface EditUserAction {
  type: EditUserActionTypes.EDIT_USER_DATA,
  payload: EditUserData
}

interface EditUserSuccessAction {
  type: EditUserActionTypes.EDIT_USER_SUCCESS
  payload: UserData
}

interface EditUserFailedAction {
  type: EditUserActionTypes.EDIT_USER_FAILED
  payload: string
}

export type EditUserActions =
EditUserAction
| EditUserSuccessAction
| EditUserFailedAction;

const editUserData = (data: EditUserData): EditUserAction => ({
  type: EditUserActionTypes.EDIT_USER_DATA,
  payload: data,
});

export const editUserSuccess = (message: UserData): EditUserSuccessAction => ({
  type: EditUserActionTypes.EDIT_USER_SUCCESS,
  payload: message,
});

export const editUserFailed = (error: string): EditUserFailedAction => ({
  type: EditUserActionTypes.EDIT_USER_FAILED,
  payload: error,
});

export default editUserData;
