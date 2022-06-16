import { PaymentSessionData } from '../../../types/events';
import { TicketsData } from '../../../types/formData';
import { CreatePaymentSessionActionTypes } from '../../actionTypes';

export interface CreatePaymentSessionAction {
  type: CreatePaymentSessionActionTypes.CREATE_PAYMENT_SESSION,
  payload: TicketsData
}

interface CreatePaymentSessionSuccessAction {
  type: CreatePaymentSessionActionTypes.CREATE_PAYMENT_SESSION_SUCCESS,
  payload: PaymentSessionData,
}

interface CreatePaymentSessionErrorAction {
  type: CreatePaymentSessionActionTypes.CREATE_PAYMENT_SESSION_ERROR,
  payload: string,
}

export type CreatePaymentSessionActions =
CreatePaymentSessionAction
| CreatePaymentSessionSuccessAction
| CreatePaymentSessionErrorAction;

const createPaymentSession = (data: TicketsData): CreatePaymentSessionAction => ({
  type: CreatePaymentSessionActionTypes.CREATE_PAYMENT_SESSION,
  payload: data,
});

export const createPaymentSessionSuccess = (
  data: PaymentSessionData,
): CreatePaymentSessionSuccessAction => ({
  type: CreatePaymentSessionActionTypes.CREATE_PAYMENT_SESSION_SUCCESS,
  payload: data,
});

export const createPaymentSessionError = (
  error: string,
): CreatePaymentSessionErrorAction => ({
  type: CreatePaymentSessionActionTypes.CREATE_PAYMENT_SESSION_ERROR,
  payload: error,
});

export default createPaymentSession;
