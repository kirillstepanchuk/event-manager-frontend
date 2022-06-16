import { PasswordData } from '../../../types/formData';
import { ResetPasswordActionTypes } from '../../actionTypes';

export interface ResetPasswordAction {
  type: ResetPasswordActionTypes.RESET_PASSWORD,
  payload: PasswordData
}

interface ResetPasswordSuccessAction {
  type: ResetPasswordActionTypes.RESET_PASSWORD_SUCCESS,
  payload: string | null,
}

interface ResetPasswordErrorAction {
  type: ResetPasswordActionTypes.RESET_PASSWORD_ERROR,
  payload: string,
}

export type ResetPasswordActions =
ResetPasswordAction
| ResetPasswordSuccessAction
| ResetPasswordErrorAction;

const resetPassword = (passwordData: PasswordData): ResetPasswordAction => ({
  type: ResetPasswordActionTypes.RESET_PASSWORD,
  payload: passwordData,
});

export const resetPasswordSuccess = (
  message: string | null,
): ResetPasswordSuccessAction => ({
  type: ResetPasswordActionTypes.RESET_PASSWORD_SUCCESS,
  payload: message,
});

export const resetPasswordError = (
  error: string,
): ResetPasswordErrorAction => ({
  type: ResetPasswordActionTypes.RESET_PASSWORD_ERROR,
  payload: error,
});

export default resetPassword;
