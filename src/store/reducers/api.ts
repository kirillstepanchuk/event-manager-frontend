import { LocationChangeAction, LOCATION_CHANGE } from 'connected-react-router';
import {
  SubscribeToNotificationsActionTypes,
  SendEmailForPasswordResetActionTypes,
  ResetPasswordActionTypes,
  CreatePaymentSessionActionTypes,
  SubscribeToNewslettersActionTypes,
  ConfirmEventsBookingActionTypes,
  AddEventActionTypes,
  EditEventActionTypes,
  CreateAdvertisementPaymentActionTypes,
  ConfirmEventAdvertisementActionTypes,
  ApproveEventActionTypes,
  DeleteEventActionTypes,
  BlockClientActionTypes,
  CloseAlertActionType,
  ImportNewClientsActionTypes,
} from '../actionTypes';
import { SubscribeToNotificationsActions } from '../actions/sendRequest/subscribeToNotifications';
import { SendEmailForPasswordResetActions } from '../actions/sendRequest/sendEmailForPasswordReset';
import { ResetPasswordActions } from '../actions/sendRequest/resetPassword';
import { CreatePaymentSessionActions } from '../actions/sendRequest/createPaymentSession';
import { SubscribeToNewslettersActions } from '../actions/sendRequest/subscribeForNewsletters';
import { ConfirmEventsBookingActions } from '../actions/sendRequest/confirmEventsBooking';
import { PaymentSessionData } from '../../types/events';
import { EditEventActions } from '../actions/sendRequest/editEvent';
import { CloseAlertActions } from '../actions/sendRequest/closeAlert';
import { AddEventActions } from '../actions/sendRequest/addEvent';
import { CreateAdvertisementPaymentActions } from '../actions/sendRequest/createAdvertisemetPayment';
import { ConfirmEventAdvertisementActions } from '../actions/sendRequest/confirmAdvertisementPayment';
import { ApproveEventActions } from '../actions/sendRequest/approveEvent';
import { DeleteEventActions } from '../actions/sendRequest/deleteEvent';
import { BlockClientActions } from '../actions/clientData/blockClient';
import { ImportNewClientsActions } from '../actions/sendRequest/importNewClients';

export const initialState: ApiState = {
  data: null,
  error: null,
  loading: false,
};

type ApiActionTypes =
SubscribeToNotificationsActions
| SendEmailForPasswordResetActions
| ResetPasswordActions
| CreatePaymentSessionActions
| SubscribeToNewslettersActions
| ConfirmEventsBookingActions
| ConfirmEventsBookingActions
| CreateAdvertisementPaymentActions
| ConfirmEventAdvertisementActions
| ApproveEventActions
| DeleteEventActions
| BlockClientActions
| AddEventActions
| EditEventActions
| ResetPasswordActions
| AddEventActions
| LocationChangeAction
| ImportNewClientsActions
| CloseAlertActions;

export interface ApiState {
  data: string | null | PaymentSessionData,
  error: string | null,
  loading: boolean,
}

const api = (state = initialState, action: ApiActionTypes): ApiState => {
  switch (action.type) {
    case SubscribeToNotificationsActionTypes.SUBSCRIBE_TO_NOTIFICATIONS:
    case SendEmailForPasswordResetActionTypes.SEND_EMAIL_FOR_PASSWORD_RESET:
    case ResetPasswordActionTypes.RESET_PASSWORD:
    case CreatePaymentSessionActionTypes.CREATE_PAYMENT_SESSION:
    case SubscribeToNewslettersActionTypes.SUBSCRIBE_TO_NEWSLETTERS:
    case ConfirmEventsBookingActionTypes.CONFIRM_EVENTS_BOOKING:
    case CreateAdvertisementPaymentActionTypes.CREATE_ADVERTISEMENT_PAYMENT:
    case ConfirmEventAdvertisementActionTypes.CONFIRM_EVENT_ADVERTISEMENT:
    case ApproveEventActionTypes.APPROVE_EVENT:
    case DeleteEventActionTypes.DELETE_EVENT:
    case BlockClientActionTypes.BLOCK_CLIENT:
    case AddEventActionTypes.ADD_EVENT:
    case EditEventActionTypes.EDIT_EVENT:
    case ImportNewClientsActionTypes.IMPORT_NEW_CLIENTS:
      return {
        ...state,
        loading: true,
      };
    case SubscribeToNotificationsActionTypes.SUBSCRIBE_TO_NOTIFICATIONS_ERROR:
    case SendEmailForPasswordResetActionTypes.SEND_EMAIL_FOR_PASSWORD_RESET_ERROR:
    case ResetPasswordActionTypes.RESET_PASSWORD_ERROR:
    case CreatePaymentSessionActionTypes.CREATE_PAYMENT_SESSION_ERROR:
    case SubscribeToNewslettersActionTypes.SUBSCRIBE_TO_NEWSLETTERS_ERROR:
    case ConfirmEventsBookingActionTypes.CONFIRM_EVENTS_BOOKING_ERROR:
    case CreateAdvertisementPaymentActionTypes.CREATE_ADVERTISEMENT_PAYMENT_ERROR:
    case ConfirmEventAdvertisementActionTypes.CONFIRM_EVENT_ADVERTISEMENT_ERROR:
    case ApproveEventActionTypes.APPROVE_EVENT_ERROR:
    case DeleteEventActionTypes.DELETE_EVENT_ERROR:
    case BlockClientActionTypes.BLOCK_CLIENT_ERROR:
    case AddEventActionTypes.ADD_EVENT_ERROR:
    case EditEventActionTypes.EDIT_EVENT_ERROR:
    case ImportNewClientsActionTypes.IMPORT_NEW_CLIENTS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SubscribeToNotificationsActionTypes.SUBSCRIBE_TO_NOTIFICATIONS_SUCCESS:
    case SendEmailForPasswordResetActionTypes.SEND_EMAIL_FOR_PASSWORD_RESET_SUCCESS:
    case ResetPasswordActionTypes.RESET_PASSWORD_SUCCESS:
    case CreatePaymentSessionActionTypes.CREATE_PAYMENT_SESSION_SUCCESS:
    case SubscribeToNewslettersActionTypes.SUBSCRIBE_TO_NEWSLETTERS_SUCCESS:
    case ConfirmEventsBookingActionTypes.CONFIRM_EVENTS_BOOKING_SUCCESS:
    case CreateAdvertisementPaymentActionTypes.CREATE_ADVERTISEMENT_PAYMENT_SUCCESS:
    case ConfirmEventAdvertisementActionTypes.CONFIRM_EVENT_ADVERTISEMENT_SUCCESS:
    case ApproveEventActionTypes.APPROVE_EVENT_SUCCESS:
    case DeleteEventActionTypes.DELETE_EVENT_SUCCESS:
    case BlockClientActionTypes.BLOCK_CLIENT_SUCCESS:
    case AddEventActionTypes.ADD_EVENT_SUCCESS:
    case EditEventActionTypes.EDIT_EVENT_SUCCESS:
    case ImportNewClientsActionTypes.IMPORT_NEW_CLIENTS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case CloseAlertActionType.CLOSE_ALERT:
    case LOCATION_CHANGE:
      return initialState;
    default:
      return state;
  }
};

export default api;
