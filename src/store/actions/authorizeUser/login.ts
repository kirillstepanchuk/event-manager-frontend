import { LoginData, UserData } from '../../../types/user';
import { AuthorizeActionTypes } from '../../actionTypes';

export interface AuthrorizeUserAction {
  type: AuthorizeActionTypes.AUTHORIZE_USER,
  payload: LoginData,
}

interface AuthrorizeUserSuccessAction {
  type: AuthorizeActionTypes.AUTHORIZE_USER_SUCCESS,
  payload: UserData,
}

interface AuthrorizeUserFailedAction {
  type: AuthorizeActionTypes.AUTHORIZE_USER_ERROR,
  payload: string,
}

export type AuthrorizeUserActions =
AuthrorizeUserAction | AuthrorizeUserSuccessAction | AuthrorizeUserFailedAction;

const loginUser = (user:LoginData): AuthrorizeUserAction => ({
  type: AuthorizeActionTypes.AUTHORIZE_USER,
  payload: user,
});

export const loginUserFailed = (error: string): AuthrorizeUserFailedAction => ({
  type: AuthorizeActionTypes.AUTHORIZE_USER_ERROR,
  payload: error,
});

export const loginUserSuccess = (data: UserData): AuthrorizeUserSuccessAction => ({
  type: AuthorizeActionTypes.AUTHORIZE_USER_SUCCESS,
  payload: data,
});

export default loginUser;
