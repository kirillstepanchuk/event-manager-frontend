import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { waitFor } from '@testing-library/react';

import {
  bookTickets, confirmBooking, buyEventAdvertisement, eventAdvertisementConfirmation,
} from '../payment.api';
import {
  mockAdvertisementData,
  mockAxiosSuccessMessage,
  mockCreatePaymentSessionSuccess, mockEventId, mockTicketsData,
} from '../../mocks/store/constants';

describe('payment api', () => {
  const mock = new MockAdapter(axios);

  afterEach(() => {
    mock.reset();
  });

  describe('book tickets call', () => {
    it('should return payment session data', async () => {
      mock.onPost(`${process.env.API_URL}/book-user-event`).reply(200, mockCreatePaymentSessionSuccess);

      const result = await bookTickets(mockTicketsData);

      await waitFor(() => {
        expect(mock.history.post[0].url).toEqual(`${process.env.API_URL}/book-user-event`);
        expect(result).toEqual(mockCreatePaymentSessionSuccess);
      });
    });
  });

  describe('confirm booking call', () => {
    it('should return success message', async () => {
      mock.onPost(`${process.env.API_URL}/confirm-booked-user-event`).reply(200, mockAxiosSuccessMessage);

      const result = await confirmBooking(mockEventId);

      await waitFor(() => {
        expect(mock.history.post[0].url).toEqual(`${process.env.API_URL}/confirm-booked-user-event`);
        expect(result).toEqual(mockAxiosSuccessMessage.message);
      });
    });
  });

  describe('buy advertisement call', () => {
    it('should return payment session data', async () => {
      mock.onPost(`${process.env.API_URL}/buy-event-advertisement`).reply(200, mockCreatePaymentSessionSuccess);

      const result = await buyEventAdvertisement(mockAdvertisementData);

      await waitFor(() => {
        expect(mock.history.post[0].url).toEqual(`${process.env.API_URL}/buy-event-advertisement`);
        expect(result).toEqual(mockCreatePaymentSessionSuccess);
      });
    });
  });

  describe('confirm advertisement call', () => {
    it('should return success message', async () => {
      mock.onPost(`${process.env.API_URL}/confirm-event-advertisement`).reply(200, mockAxiosSuccessMessage);

      const result = await eventAdvertisementConfirmation(mockEventId);

      await waitFor(() => {
        expect(mock.history.post[0].url).toEqual(`${process.env.API_URL}/confirm-event-advertisement`);
        expect(result).toEqual(mockAxiosSuccessMessage.message);
      });
    });
  });
});
