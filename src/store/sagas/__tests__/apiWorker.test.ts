import { runSaga } from 'redux-saga';

import * as notificationsApi from '../../../api/notifications.api';
import * as paymentApi from '../../../api/payment.api';
import * as passwordResetApi from '../../../api/passwordReset.api';
import * as userApi from '../../../api/user.api';
import * as eventsApi from '../../../api/events.api';
import {
  mockError,
  mockSuccess,
  mockAuthUserData,
  mockUserId,
  mockTicketsData,
  mockCategoriesData,
  mockCreatePaymentSessionSuccess,
  mockEventId,
  mockAdvertisementData,
  mockUserCategories,
  mockNewEvent,
  mockEditEvent,
} from '../../../mocks/store/constants';
import { Event } from '../../../types/events';
import subscribeToNewsletters, { subscribeToNewslettersSuccess, subscribeToNewslettersError } from '../../actions/sendRequest/subscribeForNewsletters';
import subscribeToNotifications, { subscribeToNotificationsSuccess, subscribeToNotificationsError } from '../../actions/sendRequest/subscribeToNotifications';
import resetPassword, { resetPasswordSuccess, resetPasswordError } from '../../actions/sendRequest/resetPassword';
import sendEmailForPasswordReset, { sendEmailForPasswordResetSuccess, sendEmailForPasswordResetError } from '../../actions/sendRequest/sendEmailForPasswordReset';
import createPaymentSession, { createPaymentSessionSuccess, createPaymentSessionError } from '../../actions/sendRequest/createPaymentSession';
import {
  subscribeUser,
  sendUserEmail,
  resetUserPassword,
  createTicketsPayment,
  subscribeForNewsletters,
  confirmTicketsBooking,
  createBuyAdvertisementPayment,
  getUserInterestedCategories,
  confirmAdvertisementPayment,
  addNewUserEvent,
  editCurrentEvent,
} from '../apiWorker';
import confirmEventsBooking, { confirmEventsBookingError, confirmEventsBookingSuccess } from '../../actions/sendRequest/confirmEventsBooking';
import createAdvertisementPayment, { createAdvertisementPaymentError, createAdvertisementPaymentSuccess } from '../../actions/sendRequest/createAdvertisemetPayment';
import confirmEventAdvertisement, { confirmEventAdvertisementError, confirmEventAdvertisementSuccess } from '../../actions/sendRequest/confirmAdvertisementPayment';
import getUserCategories, { getUserCategoriesError, getUserCategoriesSuccess } from '../../actions/sendRequest/getInterestedCategories';
import addNewEvent, { addNewEventError, addNewEventSuccess } from '../../actions/sendRequest/addEvent';
import editEvent, { editEventError, editEventSuccess } from '../../actions/sendRequest/editEvent';

describe('Events saga', () => {
  let fetchEventsData: jest.SpyInstance;

  afterEach(() => {
    fetchEventsData.mockClear();
  });

  describe('should put events in store', () => {
    it('events categories', async () => {
      fetchEventsData = jest.spyOn(notificationsApi, 'subscribeToNotifications')
        .mockImplementation(() => Promise.resolve(mockSuccess));

      const dispatched: Event[] = [];

      await runSaga({
        dispatch: (action: Event) => dispatched.push(action),
      }, subscribeUser, subscribeToNotifications({
        phone: mockAuthUserData.phone.valid,
      })).toPromise();

      expect(fetchEventsData).toHaveBeenCalledTimes(1);
      expect(dispatched[0]).toEqual(subscribeToNotificationsSuccess(mockSuccess));
    });

    it('category of events', async () => {
      fetchEventsData = jest.spyOn(passwordResetApi, 'sendEmail')
        .mockImplementation(() => Promise.resolve(mockSuccess));

      const dispatched: Event[] = [];

      await runSaga({
        dispatch: (action: Event) => dispatched.push(action),
      }, sendUserEmail, sendEmailForPasswordReset({
        email: mockAuthUserData.email.valid,
      })).toPromise();

      expect(fetchEventsData).toHaveBeenCalledTimes(1);
      expect(dispatched[0]).toEqual(sendEmailForPasswordResetSuccess(mockSuccess));
    });

    it('searched events', async () => {
      fetchEventsData = jest.spyOn(passwordResetApi, 'resetPassword')
        .mockImplementation(() => Promise.resolve(mockSuccess));

      const dispatched: Event[] = [];

      await runSaga({
        dispatch: (action: Event) => dispatched.push(action),
      }, resetUserPassword, resetPassword({
        password: mockAuthUserData.password.valid,
        repeatedPassword: mockAuthUserData.repeatedPassword.valid,
        userId: mockUserId,
      })).toPromise();

      expect(fetchEventsData).toHaveBeenCalledTimes(1);
      expect(dispatched[0]).toEqual(resetPasswordSuccess(mockSuccess));
    });

    it('map events', async () => {
      fetchEventsData = jest.spyOn(paymentApi, 'bookTickets')
        .mockImplementation(() => Promise.resolve(mockCreatePaymentSessionSuccess));

      const dispatched: Event[] = [];

      await runSaga({
        dispatch: (action: Event) => dispatched.push(action),
      }, createTicketsPayment, createPaymentSession(mockTicketsData)).toPromise();

      expect(fetchEventsData).toHaveBeenCalledTimes(1);
      expect(dispatched[0]).toEqual(createPaymentSessionSuccess(mockCreatePaymentSessionSuccess));
    });

    it('profile events', async () => {
      fetchEventsData = jest.spyOn(notificationsApi, 'subscribeToNewsletters')
        .mockImplementation(() => Promise.resolve(mockSuccess));

      const dispatched: Event[] = [];

      await runSaga({
        dispatch: (action: Event) => dispatched.push(action),
      }, subscribeForNewsletters, subscribeToNewsletters(mockCategoriesData)).toPromise();

      expect(fetchEventsData).toHaveBeenCalledTimes(1);
      expect(dispatched[0]).toEqual(subscribeToNewslettersSuccess(mockSuccess));
    });

    it('confirm booking', async () => {
      fetchEventsData = jest.spyOn(paymentApi, 'confirmBooking')
        .mockImplementation(() => Promise.resolve(mockSuccess));

      const dispatched: Event[] = [];

      await runSaga({
        dispatch: (action: Event) => dispatched.push(action),
      }, confirmTicketsBooking, confirmEventsBooking(mockEventId)).toPromise();

      expect(fetchEventsData).toHaveBeenCalledTimes(1);
      expect(dispatched[0]).toEqual(confirmEventsBookingSuccess(mockSuccess));
    });

    it('create adv payment', async () => {
      fetchEventsData = jest.spyOn(paymentApi, 'buyEventAdvertisement')
        .mockImplementation(() => Promise.resolve(mockCreatePaymentSessionSuccess));

      const dispatched: Event[] = [];

      await runSaga({
        dispatch: (action: Event) => dispatched.push(action),
      }, createBuyAdvertisementPayment, createAdvertisementPayment(mockAdvertisementData))
        .toPromise();

      expect(fetchEventsData).toHaveBeenCalledTimes(1);
      expect(dispatched[0]).toEqual(
        createAdvertisementPaymentSuccess(mockCreatePaymentSessionSuccess),
      );
    });

    it('confirm adv payment', async () => {
      fetchEventsData = jest.spyOn(paymentApi, 'eventAdvertisementConfirmation')
        .mockImplementation(() => Promise.resolve(mockSuccess));

      const dispatched: Event[] = [];

      await runSaga({
        dispatch: (action: Event) => dispatched.push(action),
      }, confirmAdvertisementPayment, confirmEventAdvertisement(mockEventId))
        .toPromise();

      expect(fetchEventsData).toHaveBeenCalledTimes(1);
      expect(dispatched[0]).toEqual(confirmEventAdvertisementSuccess(mockSuccess));
    });

    it('get interested categories', async () => {
      fetchEventsData = jest.spyOn(userApi, 'fetchUserCategories')
        .mockImplementation(() => Promise.resolve(mockUserCategories));

      const dispatched: Event[] = [];

      await runSaga({
        dispatch: (action: Event) => dispatched.push(action),
      }, getUserInterestedCategories, getUserCategories(mockUserId.toString()))
        .toPromise();

      expect(fetchEventsData).toHaveBeenCalledTimes(1);
      expect(dispatched[0]).toEqual(getUserCategoriesSuccess(mockUserCategories));
    });

    it('add event', async () => {
      fetchEventsData = jest.spyOn(eventsApi, 'addEvent')
        .mockImplementation(() => Promise.resolve(mockSuccess));

      const dispatched: Event[] = [];

      await runSaga({
        dispatch: (action: Event) => dispatched.push(action),
      }, addNewUserEvent, addNewEvent(mockNewEvent))
        .toPromise();

      expect(fetchEventsData).toHaveBeenCalledTimes(1);
      expect(dispatched[0]).toEqual(addNewEventSuccess(mockSuccess));
    });

    it('edit event', async () => {
      fetchEventsData = jest.spyOn(eventsApi, 'editEvent')
        .mockImplementation(() => Promise.resolve(mockSuccess));

      const dispatched: Event[] = [];

      await runSaga({
        dispatch: (action: Event) => dispatched.push(action),
      }, editCurrentEvent, editEvent(mockEditEvent))
        .toPromise();

      expect(fetchEventsData).toHaveBeenCalledTimes(1);
      expect(dispatched[0]).toEqual(editEventSuccess(mockSuccess));
    });
  });

  describe('should throw an error in catch block', () => {
    it('events categories', async () => {
      fetchEventsData = jest.spyOn(notificationsApi, 'subscribeToNotifications')
        .mockImplementation(() => Promise.reject(mockError));

      const dispatched: Event[] = [];

      await runSaga({
        dispatch: (action: Event) => dispatched.push(action),
      }, subscribeUser, subscribeToNotifications({
        phone: mockAuthUserData.phone.valid,
      })).toPromise();

      expect(fetchEventsData).toHaveBeenCalledTimes(1);
      expect(dispatched[0]).toEqual(subscribeToNotificationsError(mockError));
    });

    it('category of events', async () => {
      fetchEventsData = jest.spyOn(passwordResetApi, 'sendEmail')
        .mockImplementation(() => Promise.reject(mockError));

      const dispatched: Event[] = [];

      await runSaga({
        dispatch: (action: Event) => dispatched.push(action),
      }, sendUserEmail, sendEmailForPasswordReset({
        email: mockAuthUserData.email.valid,
      })).toPromise();

      expect(fetchEventsData).toHaveBeenCalledTimes(1);
      expect(dispatched[0]).toEqual(sendEmailForPasswordResetError(mockError));
    });

    it('searched events', async () => {
      fetchEventsData = jest.spyOn(passwordResetApi, 'resetPassword')
        .mockImplementation(() => Promise.reject(mockError));

      const dispatched: Event[] = [];

      await runSaga({
        dispatch: (action: Event) => dispatched.push(action),
      }, resetUserPassword, resetPassword({
        password: mockAuthUserData.password.valid,
        repeatedPassword: mockAuthUserData.repeatedPassword.valid,
        userId: mockUserId,
      })).toPromise();

      expect(fetchEventsData).toHaveBeenCalledTimes(1);
      expect(dispatched[0]).toEqual(resetPasswordError(mockError));
    });

    it('map events', async () => {
      fetchEventsData = jest.spyOn(paymentApi, 'bookTickets')
        .mockImplementation(() => Promise.reject(mockError));

      const dispatched: Event[] = [];

      await runSaga({
        dispatch: (action: Event) => dispatched.push(action),
      }, createTicketsPayment, createPaymentSession(mockTicketsData)).toPromise();

      expect(fetchEventsData).toHaveBeenCalledTimes(1);
      expect(dispatched[0]).toEqual(createPaymentSessionError(mockError));
    });

    it('profile events', async () => {
      fetchEventsData = jest.spyOn(notificationsApi, 'subscribeToNewsletters')
        .mockImplementation(() => Promise.reject(mockError));

      const dispatched: Event[] = [];

      await runSaga({
        dispatch: (action: Event) => dispatched.push(action),
      }, subscribeForNewsletters, subscribeToNewsletters(mockCategoriesData)).toPromise();

      expect(fetchEventsData).toHaveBeenCalledTimes(1);
      expect(dispatched[0]).toEqual(subscribeToNewslettersError(mockError));
    });
  });

  it('confirm booking', async () => {
    fetchEventsData = jest.spyOn(paymentApi, 'confirmBooking')
      .mockImplementation(() => Promise.reject(mockError));

    const dispatched: Event[] = [];

    await runSaga({
      dispatch: (action: Event) => dispatched.push(action),
    }, confirmTicketsBooking, confirmEventsBooking(mockEventId)).toPromise();

    expect(fetchEventsData).toHaveBeenCalledTimes(1);
    expect(dispatched[0]).toEqual(confirmEventsBookingError(mockError));
  });

  it('create adv payment', async () => {
    fetchEventsData = jest.spyOn(paymentApi, 'buyEventAdvertisement')
      .mockImplementation(() => Promise.reject(mockError));

    const dispatched: Event[] = [];

    await runSaga({
      dispatch: (action: Event) => dispatched.push(action),
    }, createBuyAdvertisementPayment, createAdvertisementPayment(mockAdvertisementData))
      .toPromise();

    expect(fetchEventsData).toHaveBeenCalledTimes(1);
    expect(dispatched[0]).toEqual(
      createAdvertisementPaymentError(mockError),
    );
  });

  it('confirm adv payment', async () => {
    fetchEventsData = jest.spyOn(paymentApi, 'eventAdvertisementConfirmation')
      .mockImplementation(() => Promise.reject(mockError));

    const dispatched: Event[] = [];

    await runSaga({
      dispatch: (action: Event) => dispatched.push(action),
    }, confirmAdvertisementPayment, confirmEventAdvertisement(mockEventId))
      .toPromise();

    expect(fetchEventsData).toHaveBeenCalledTimes(1);
    expect(dispatched[0]).toEqual(confirmEventAdvertisementError(mockError));
  });

  it('get interested categories', async () => {
    fetchEventsData = jest.spyOn(userApi, 'fetchUserCategories')
      .mockImplementation(() => Promise.reject(mockError));

    const dispatched: Event[] = [];

    await runSaga({
      dispatch: (action: Event) => dispatched.push(action),
    }, getUserInterestedCategories, getUserCategories(mockUserId.toString()))
      .toPromise();

    expect(fetchEventsData).toHaveBeenCalledTimes(1);
    expect(dispatched[0]).toEqual(getUserCategoriesError(mockError));
  });

  it('add event', async () => {
    fetchEventsData = jest.spyOn(eventsApi, 'addEvent')
      .mockImplementation(() => Promise.reject(mockError));

    const dispatched: Event[] = [];

    await runSaga({
      dispatch: (action: Event) => dispatched.push(action),
    }, addNewUserEvent, addNewEvent(mockNewEvent))
      .toPromise();

    expect(fetchEventsData).toHaveBeenCalledTimes(1);
    expect(dispatched[0]).toEqual(addNewEventError(mockError));
  });

  it('edit event', async () => {
    fetchEventsData = jest.spyOn(eventsApi, 'editEvent')
      .mockImplementation(() => Promise.reject(mockError));

    const dispatched: Event[] = [];

    await runSaga({
      dispatch: (action: Event) => dispatched.push(action),
    }, editCurrentEvent, editEvent(mockEditEvent))
      .toPromise();

    expect(fetchEventsData).toHaveBeenCalledTimes(1);
    expect(dispatched[0]).toEqual(editEventError(mockError));
  });
});
