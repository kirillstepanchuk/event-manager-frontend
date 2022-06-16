import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { waitFor } from '@testing-library/react';

import { subscribeToNewsletters, subscribeToNotifications } from '../notifications.api';
import {
  mockAuthUserData,
  mockAxiosSuccessMessage, mockCategoriesData, mockSuccess,
} from '../../mocks/store/constants';

describe('notifications api', () => {
  const mock = new MockAdapter(axios);

  afterEach(() => {
    mock.reset();
  });

  describe('subscribe to caregories call', () => {
    it('should return success message', async () => {
      mock.onPost(`${process.env.API_URL}/set-interested-categories`).reply(200, mockAxiosSuccessMessage);

      const result = await subscribeToNewsletters(mockCategoriesData);

      await waitFor(() => {
        expect(mock.history.post[0].url).toEqual(`${process.env.API_URL}/set-interested-categories`);
        expect(result).toEqual(mockSuccess);
      });
    });
  });

  describe('subscribe for sms call', () => {
    it('should return success message', async () => {
      mock.onPost(`${process.env.API_URL}/send-message`).reply(200, mockAxiosSuccessMessage);

      const result = await subscribeToNotifications({ phone: mockAuthUserData.phone.valid });

      await waitFor(() => {
        expect(mock.history.post[0].url).toEqual(`${process.env.API_URL}/send-message`);
        expect(result).toEqual(mockSuccess);
      });
    });
  });
});
