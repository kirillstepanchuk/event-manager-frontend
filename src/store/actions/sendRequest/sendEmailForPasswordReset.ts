import { EmailData } from '../../../types/formData';
import { SendEmailForPasswordResetActionTypes } from '../../actionTypes';

export interface SendEmailForPasswordResetAction {
  type: SendEmailForPasswordResetActionTypes.SEND_EMAIL_FOR_PASSWORD_RESET,
  payload: EmailData
}

interface SendEmailForPasswordResetSuccessAction {
  type: SendEmailForPasswordResetActionTypes.SEND_EMAIL_FOR_PASSWORD_RESET_SUCCESS,
  payload: string | null,
}

interface SendEmailForPasswordResetErrorAction {
  type: SendEmailForPasswordResetActionTypes.SEND_EMAIL_FOR_PASSWORD_RESET_ERROR,
  payload: string,
}

export type SendEmailForPasswordResetActions =
SendEmailForPasswordResetAction
| SendEmailForPasswordResetSuccessAction
| SendEmailForPasswordResetErrorAction;

const sendEmailForPasswordReset = (email: EmailData): SendEmailForPasswordResetAction => ({
  type: SendEmailForPasswordResetActionTypes.SEND_EMAIL_FOR_PASSWORD_RESET,
  payload: email,
});

export const sendEmailForPasswordResetSuccess = (
  message: string | null,
): SendEmailForPasswordResetSuccessAction => ({
  type: SendEmailForPasswordResetActionTypes.SEND_EMAIL_FOR_PASSWORD_RESET_SUCCESS,
  payload: message,
});

export const sendEmailForPasswordResetError = (
  error: string,
): SendEmailForPasswordResetErrorAction => ({
  type: SendEmailForPasswordResetActionTypes.SEND_EMAIL_FOR_PASSWORD_RESET_ERROR,
  payload: error,
});

export default sendEmailForPasswordReset;
