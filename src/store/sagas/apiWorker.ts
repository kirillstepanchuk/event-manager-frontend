import { put, call, takeEvery } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { subscribeToNotifications, subscribeToNewsletters } from '../../api/notifications.api';
import {
  ConfirmEventsBookingActionTypes,
  CreatePaymentSessionActionTypes,
  AddEventActionTypes,
  EditEventActionTypes,
  ResetPasswordActionTypes,
  SendEmailForPasswordResetActionTypes,
  SubscribeToNotificationsActionTypes,
  SubscribeToNewslettersActionTypes,
  CreateAdvertisementPaymentActionTypes,
  ConfirmEventAdvertisementActionTypes,
  ApproveEventActionTypes,
  DeleteEventActionTypes,
  GetUserCategoriesActionTypes,
  ImportNewClientsActionTypes,
} from '../actionTypes';
import handleError from '../../utils/errorHandler';
import { SubscribeToNotificationsAction, subscribeToNotificationsError, subscribeToNotificationsSuccess } from '../actions/sendRequest/subscribeToNotifications';
import { SendEmailForPasswordResetAction, sendEmailForPasswordResetError, sendEmailForPasswordResetSuccess } from '../actions/sendRequest/sendEmailForPasswordReset';
import { resetPassword, sendEmail } from '../../api/passwordReset.api';
import { ResetPasswordAction, resetPasswordError, resetPasswordSuccess } from '../actions/sendRequest/resetPassword';
import { CreatePaymentSessionAction, createPaymentSessionError, createPaymentSessionSuccess } from '../actions/sendRequest/createPaymentSession';
import { SubscribeToNewslettersAction, subscribeToNewslettersError, subscribeToNewslettersSuccess } from '../actions/sendRequest/subscribeForNewsletters';
import {
  buyEventAdvertisement, confirmBooking, bookTickets, eventAdvertisementConfirmation,
} from '../../api/payment.api';
import { ConfirmEventsBookingAction, confirmEventsBookingError, confirmEventsBookingSuccess } from '../actions/sendRequest/confirmEventsBooking';
import { deleteCookie, setCookie } from '../../utils/cookiesUtils';
import { PaymentSessionData } from '../../types/events';
import { COOKIES } from '../../constants';
import { AddEventAction, addNewEventError, addNewEventSuccess } from '../actions/sendRequest/addEvent';
import { EditEventAction, editEventError, editEventSuccess } from '../actions/sendRequest/editEvent';
import { addEvent, editEvent } from '../../api/events.api';
import { CreateAdvertisementPaymentAction, createAdvertisementPaymentError, createAdvertisementPaymentSuccess } from '../actions/sendRequest/createAdvertisemetPayment';
import { ConfirmEventAdvertisementAction, confirmEventAdvertisementError, confirmEventAdvertisementSuccess } from '../actions/sendRequest/confirmAdvertisementPayment';
import { ApproveEventAction, approveEventError, approveEventSuccess } from '../actions/sendRequest/approveEvent';
import { approveEvent, deleteEvent } from '../../api/event.api';
import { DeleteEventAction, deleteEventError, deleteEventSuccess } from '../actions/sendRequest/deleteEvent';
import { fetchUserCategories } from '../../api/user.api';
import { UserCategorie } from '../../types/user';
import { GetUserCategoriesAction, getUserCategoriesError, getUserCategoriesSuccess } from '../actions/sendRequest/getInterestedCategories';
import { ImportNewClientsAction, importNewClientsError, importNewClientsSuccess } from '../actions/sendRequest/importNewClients';
import { importClients } from '../../api/clients.api';

export function* subscribeUser(action: SubscribeToNotificationsAction): SagaIterator<void> {
  try {
    const data:string | null = yield call(
      subscribeToNotifications,
      action.payload,
    );
    yield put(
      subscribeToNotificationsSuccess(data),
    );
  } catch (e: unknown) {
    yield put(
      subscribeToNotificationsError(handleError(e)),
    );
  }
}

export function* sendUserEmail(action: SendEmailForPasswordResetAction): SagaIterator<void> {
  try {
    const data:string | null = yield call(
      sendEmail,
      action.payload,
    );
    yield put(
      sendEmailForPasswordResetSuccess(data),
    );
  } catch (e: unknown) {
    yield put(
      sendEmailForPasswordResetError(handleError(e)),
    );
  }
}

export function* resetUserPassword(action: ResetPasswordAction): SagaIterator<void> {
  try {
    const data:string | null = yield call(
      resetPassword,
      action.payload,
    );
    yield put(
      resetPasswordSuccess(data),
    );
  } catch (e: unknown) {
    yield put(
      resetPasswordError(handleError(e)),
    );
  }
}

export function* createTicketsPayment(action: CreatePaymentSessionAction): SagaIterator<void> {
  try {
    const data:PaymentSessionData = yield call(
      bookTickets,
      action.payload,
    );
    yield put(
      createPaymentSessionSuccess(data),
    );
    yield call(setCookie, COOKIES.paymentSessionId, data.session_id);
    window.location.replace(data.url);
  } catch (e: unknown) {
    yield put(
      createPaymentSessionError(handleError(e)),
    );
  }
}

export function* subscribeForNewsletters(
  action: SubscribeToNewslettersAction,
): SagaIterator<void> {
  try {
    const data:string = yield call(
      subscribeToNewsletters,
      action.payload,
    );
    yield put(
      subscribeToNewslettersSuccess(data),
    );
  } catch (e) {
    yield put(
      subscribeToNewslettersError(handleError(e)),
    );
  }
}

export function* confirmTicketsBooking(action: ConfirmEventsBookingAction): SagaIterator<void> {
  try {
    const data:string = yield call(
      confirmBooking,
      action.payload,
    );
    yield put(
      confirmEventsBookingSuccess(data),
    );
    yield call(deleteCookie, COOKIES.paymentSessionId);
  } catch (e) {
    yield put(
      confirmEventsBookingError(handleError(e)),
    );
  }
}

export function* addNewUserEvent(action: AddEventAction): SagaIterator<void> {
  try {
    const data:string = yield call(addEvent, action.payload);
    yield put(addNewEventSuccess(data));
  } catch (e) {
    yield put(addNewEventError(handleError(e)));
  }
}

export function* editCurrentEvent(action: EditEventAction): SagaIterator<void> {
  try {
    const data:string = yield call(editEvent, action.payload.data, action.payload.id);
    yield put(editEventSuccess(data));
  } catch (e) {
    yield put(editEventError(handleError(e)));
  }
}

export function* createBuyAdvertisementPayment(
  action: CreateAdvertisementPaymentAction,
): SagaIterator<void> {
  try {
    const data:PaymentSessionData = yield call(
      buyEventAdvertisement,
      action.payload,
    );
    yield put(
      createAdvertisementPaymentSuccess(data),
    );
    yield call(setCookie, COOKIES.paymentSessionId, data.session_id);
    window.location.replace(data.url);
  } catch (e) {
    yield put(
      createAdvertisementPaymentError(handleError(e)),
    );
  }
}

export function* confirmAdvertisementPayment(
  action: ConfirmEventAdvertisementAction,
): SagaIterator<void> {
  try {
    const data:string = yield call(
      eventAdvertisementConfirmation,
      action.payload,
    );
    yield put(
      confirmEventAdvertisementSuccess(data),
    );
    yield call(deleteCookie, COOKIES.paymentSessionId);
  } catch (e) {
    yield put(
      confirmEventAdvertisementError(handleError(e)),
    );
  }
}

export function* approvePendingEvent(action: ApproveEventAction): SagaIterator<void> {
  try {
    const data:string = yield call(approveEvent, action.payload);
    yield put(approveEventSuccess(data));
  } catch (e) {
    yield put(approveEventError(handleError(e)));
  }
}

export function* deletePendingEvent(action: DeleteEventAction): SagaIterator<void> {
  try {
    const data:string = yield call(deleteEvent, action.payload);
    yield put(deleteEventSuccess(data));
  } catch (e) {
    yield put(deleteEventError(handleError(e)));
  }
}

export function* getUserInterestedCategories(action: GetUserCategoriesAction): SagaIterator<void> {
  try {
    const data:UserCategorie[] = yield call(fetchUserCategories, action.payload);
    yield put(getUserCategoriesSuccess(data));
  } catch (e) {
    yield put(getUserCategoriesError(handleError(e)));
  }
}

export function* importCustomers(action: ImportNewClientsAction): SagaIterator<void> {
  try {
    const data: string = yield call(importClients, action.payload);
    yield put(importNewClientsSuccess(data));
  } catch (e) {
    yield put(importNewClientsError(handleError(e)));
  }
}

export default function* apiWatcher() {
  yield takeEvery(SubscribeToNotificationsActionTypes.SUBSCRIBE_TO_NOTIFICATIONS, subscribeUser);
  yield takeEvery(
    SendEmailForPasswordResetActionTypes.SEND_EMAIL_FOR_PASSWORD_RESET,
    sendUserEmail,
  );
  yield takeEvery(ResetPasswordActionTypes.RESET_PASSWORD, resetUserPassword);
  yield takeEvery(CreatePaymentSessionActionTypes.CREATE_PAYMENT_SESSION, createTicketsPayment);
  yield takeEvery(
    SubscribeToNewslettersActionTypes.SUBSCRIBE_TO_NEWSLETTERS,
    subscribeForNewsletters,
  );
  yield takeEvery(ConfirmEventsBookingActionTypes.CONFIRM_EVENTS_BOOKING, confirmTicketsBooking);
  yield takeEvery(AddEventActionTypes.ADD_EVENT, addNewUserEvent);
  yield takeEvery(EditEventActionTypes.EDIT_EVENT, editCurrentEvent);
  yield takeEvery(
    CreateAdvertisementPaymentActionTypes.CREATE_ADVERTISEMENT_PAYMENT,
    createBuyAdvertisementPayment,
  );
  yield takeEvery(
    ConfirmEventAdvertisementActionTypes.CONFIRM_EVENT_ADVERTISEMENT,
    confirmAdvertisementPayment,
  );
  yield takeEvery(ApproveEventActionTypes.APPROVE_EVENT, approvePendingEvent);
  yield takeEvery(DeleteEventActionTypes.DELETE_EVENT, deletePendingEvent);
  yield takeEvery(GetUserCategoriesActionTypes.GET_USER_CATEGORIES, getUserInterestedCategories);
  yield takeEvery(ImportNewClientsActionTypes.IMPORT_NEW_CLIENTS, importCustomers);
}
