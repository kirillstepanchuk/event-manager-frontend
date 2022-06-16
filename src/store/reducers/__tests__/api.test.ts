import api, { initialState } from '../api';
import subscribeToNewsletters, { subscribeToNewslettersSuccess, subscribeToNewslettersError } from '../../actions/sendRequest/subscribeForNewsletters';
import subscribeToNotifications, { subscribeToNotificationsSuccess, subscribeToNotificationsError } from '../../actions/sendRequest/subscribeToNotifications';
import resetPassword, { resetPasswordSuccess, resetPasswordError } from '../../actions/sendRequest/resetPassword';
import sendEmailForPasswordReset, { sendEmailForPasswordResetSuccess, sendEmailForPasswordResetError } from '../../actions/sendRequest/sendEmailForPasswordReset';
import createPaymentSession, { createPaymentSessionSuccess, createPaymentSessionError } from '../../actions/sendRequest/createPaymentSession';
import {
  mockError,
  mockCategoriesData,
  mockAuthUserData,
  mockUserId, mockTicketsData, mockSuccess, mockCreatePaymentSessionSuccess,
} from '../../../mocks/store/constants';

const loadingState = {
  ...initialState,
  loading: true,
};

const errorState = {
  ...initialState,
  error: mockError,
};

const dataState = {
  ...initialState,
  data: mockSuccess,
};

describe('User reducer', () => {
  describe('loading should be true', () => {
    it('dispatch SUBSCRIBE_TO_NEWSLETTERS action', () => {
      const reducer = api(initialState, subscribeToNewsletters(mockCategoriesData));
      expect(reducer).toEqual(loadingState);
    });

    it('dispatch SUBSCRIBE_TO_NOTIFICATIONS action', () => {
      const reducer = api(initialState, subscribeToNotifications({
        phone: mockAuthUserData.phone.valid,
      }));
      expect(reducer).toEqual(loadingState);
    });

    it('dispatch RESET_PASSWORD action', () => {
      const reducer = api(initialState, resetPassword({
        password: mockAuthUserData.password.valid,
        repeatedPassword: mockAuthUserData.repeatedPassword.valid,
        userId: mockUserId,
      }));
      expect(reducer).toEqual(loadingState);
    });

    it('dispatch SEND_EMAIL_FOR_PASSWORD_RESET action', () => {
      const reducer = api(initialState, sendEmailForPasswordReset({
        email: mockAuthUserData.email.valid,
      }));
      expect(reducer).toEqual(loadingState);
    });

    it('dispatch CREATE_PAYMENT_SESSION action', () => {
      const reducer = api(initialState, createPaymentSession(mockTicketsData));
      expect(reducer).toEqual(loadingState);
    });
  });

  describe('error should be', () => {
    it('dispatch SUBSCRIBE_TO_NEWSLETTERS_ERROR action', () => {
      const reducer = api(loadingState, subscribeToNewslettersError(mockError));
      expect(reducer).toEqual(errorState);
    });

    it('dispatch SUBSCRIBE_TO_NOTIFICATIONS_ERROR action', () => {
      const reducer = api(loadingState, subscribeToNotificationsError(mockError));
      expect(reducer).toEqual(errorState);
    });

    it('dispatch RESET_PASSWORD_ERROR action', () => {
      const reducer = api(loadingState, resetPasswordError(mockError));
      expect(reducer).toEqual(errorState);
    });

    it('dispatch SEND_EMAIL_FOR_PASSWORD_RESET_ERROR action', () => {
      const reducer = api(loadingState, sendEmailForPasswordResetError(mockError));
      expect(reducer).toEqual(errorState);
    });

    it('dispatch CREATE_PAYMENT_SESSION_ERROR action', () => {
      const reducer = api(loadingState, createPaymentSessionError(mockError));
      expect(reducer).toEqual(errorState);
    });
  });

  describe('data should be', () => {
    it('dispatch SUBSCRIBE_TO_NEWSLETTERS_SUCCESS action', () => {
      const reducer = api(loadingState, subscribeToNewslettersSuccess(mockSuccess));
      expect(reducer).toEqual(dataState);
    });

    it('dispatch SUBSCRIBE_TO_NOTIFICATIONS_SUCCESS action', () => {
      const reducer = api(loadingState, subscribeToNotificationsSuccess(mockSuccess));
      expect(reducer).toEqual(dataState);
    });

    it('dispatch RESET_PASSWORD_SUCCESS action', () => {
      const reducer = api(loadingState, resetPasswordSuccess(mockSuccess));
      expect(reducer).toEqual(dataState);
    });

    it('dispatch SEND_EMAIL_FOR_PASSWORD_RESET_SUCCESS action', () => {
      const reducer = api(loadingState, sendEmailForPasswordResetSuccess(mockSuccess));
      expect(reducer).toEqual(dataState);
    });

    it('dispatch CREATE_PAYMENT_SESSION_SUCCESS  action', () => {
      const reducer = api(loadingState, createPaymentSessionSuccess(
        mockCreatePaymentSessionSuccess,
      ));
      expect(reducer).toEqual({
        ...initialState,
        data: mockCreatePaymentSessionSuccess,
      });
    });
  });
});
