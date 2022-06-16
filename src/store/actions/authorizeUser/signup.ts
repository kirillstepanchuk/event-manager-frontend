import { SignupData, UserData } from '../../../types/user';
import { RegisterActionTypes } from '../../actionTypes';

export interface RegisterUserAction {
  type: RegisterActionTypes.REGISTER_USER,
  payload: SignupData,
}

interface RegisterUserSuccessAction {
  type: RegisterActionTypes.REGISTER_USER_SUCCESS,
  payload: UserData,
}

interface RegisterUserFailedAction {
  type: RegisterActionTypes.REGISTER_USER_ERROR,
  payload: string,
}

export type RegisterUserActions =
RegisterUserAction | RegisterUserSuccessAction | RegisterUserFailedAction;

const signupUser = (user:SignupData): RegisterUserAction => ({
  type: RegisterActionTypes.REGISTER_USER,
  payload: user,
});

export const signupUserFailed = (error: string): RegisterUserFailedAction => ({
  type: RegisterActionTypes.REGISTER_USER_ERROR,
  payload: error,
});

export const signupUserSuccess = (data: UserData): RegisterUserSuccessAction => ({
  type: RegisterActionTypes.REGISTER_USER_SUCCESS,
  payload: data,
});

export default signupUser;
