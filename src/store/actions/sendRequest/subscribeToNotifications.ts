import { PhoneData } from '../../../types/formData';
import { SubscribeToNotificationsActionTypes } from '../../actionTypes';

export interface SubscribeToNotificationsAction {
  type: SubscribeToNotificationsActionTypes.SUBSCRIBE_TO_NOTIFICATIONS,
  payload: PhoneData
}

interface SubscribeToNotificationsSuccessAction {
  type: SubscribeToNotificationsActionTypes.SUBSCRIBE_TO_NOTIFICATIONS_SUCCESS,
  payload: string | null,
}

interface SubscribeToNotificationsErrorAction {
  type: SubscribeToNotificationsActionTypes.SUBSCRIBE_TO_NOTIFICATIONS_ERROR,
  payload: string,
}

export type SubscribeToNotificationsActions =
SubscribeToNotificationsAction
| SubscribeToNotificationsSuccessAction
| SubscribeToNotificationsErrorAction;

const subscribeToNotifications = (number: PhoneData): SubscribeToNotificationsAction => ({
  type: SubscribeToNotificationsActionTypes.SUBSCRIBE_TO_NOTIFICATIONS,
  payload: number,
});

export const subscribeToNotificationsSuccess = (
  message: string | null,
): SubscribeToNotificationsSuccessAction => ({
  type: SubscribeToNotificationsActionTypes.SUBSCRIBE_TO_NOTIFICATIONS_SUCCESS,
  payload: message,
});

export const subscribeToNotificationsError = (
  error: string,
): SubscribeToNotificationsErrorAction => ({
  type: SubscribeToNotificationsActionTypes.SUBSCRIBE_TO_NOTIFICATIONS_ERROR,
  payload: error,
});

export default subscribeToNotifications;
