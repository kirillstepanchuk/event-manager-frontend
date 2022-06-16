import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { waitFor } from '@testing-library/react';

import { resetPassword, sendEmail } from '../passwordReset.api';
import {
  mockAuthUserData,
  mockAxiosSuccessMessage, mockResetPassword, mockSuccess,
} from '../../mocks/store/constants';

describe('password reset api', () => {
  const mock = new MockAdapter(axios);

  afterEach(() => {
    mock.reset();
  });

  describe('send email call', () => {
    it('should return success message', async () => {
      mock.onPost(`${process.env.API_URL}/forgot-password`).reply(200, mockAxiosSuccessMessage);

      const result = await sendEmail({ email: mockAuthUserData.email.valid });

      await waitFor(() => {
        expect(mock.history.post[0].url).toEqual(`${process.env.API_URL}/forgot-password`);
        expect(result).toEqual(mockSuccess);
      });
    });
  });

  describe('reset password call', () => {
    it('should return success message', async () => {
      mock.onPost(`${process.env.API_URL}/reset-password`).reply(200, mockAxiosSuccessMessage);

      const result = await resetPassword(mockResetPassword);

      await waitFor(() => {
        expect(mock.history.post[0].url).toEqual(`${process.env.API_URL}/reset-password`);
        expect(result).toEqual(mockSuccess);
      });
    });
  });
});
