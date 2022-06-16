import { AdvertisementData, PaymentSessionData } from '../../../types/events';
import { CreateAdvertisementPaymentActionTypes } from '../../actionTypes';

export interface CreateAdvertisementPaymentAction {
  type: CreateAdvertisementPaymentActionTypes.CREATE_ADVERTISEMENT_PAYMENT,
  payload: AdvertisementData
}

interface CreateAdvertisementPaymentSuccessAction {
  type: CreateAdvertisementPaymentActionTypes.CREATE_ADVERTISEMENT_PAYMENT_SUCCESS,
  payload: PaymentSessionData,
}

interface CreateAdvertisementPaymentErrorAction {
  type: CreateAdvertisementPaymentActionTypes.CREATE_ADVERTISEMENT_PAYMENT_ERROR,
  payload: string,
}

export type CreateAdvertisementPaymentActions =
CreateAdvertisementPaymentAction
| CreateAdvertisementPaymentSuccessAction
| CreateAdvertisementPaymentErrorAction;

const createAdvertisementPayment = (data: AdvertisementData): CreateAdvertisementPaymentAction => ({
  type: CreateAdvertisementPaymentActionTypes.CREATE_ADVERTISEMENT_PAYMENT,
  payload: data,
});

export const createAdvertisementPaymentSuccess = (
  data: PaymentSessionData,
): CreateAdvertisementPaymentSuccessAction => ({
  type: CreateAdvertisementPaymentActionTypes.CREATE_ADVERTISEMENT_PAYMENT_SUCCESS,
  payload: data,
});

export const createAdvertisementPaymentError = (
  error: string,
): CreateAdvertisementPaymentErrorAction => ({
  type: CreateAdvertisementPaymentActionTypes.CREATE_ADVERTISEMENT_PAYMENT_ERROR,
  payload: error,
});

export default createAdvertisementPayment;
