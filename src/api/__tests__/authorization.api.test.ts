import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { waitFor } from '@testing-library/react';

import { fetchAuthorization, fetchRegistration, fetchUserConfirmation } from '../authorization.api';
import {
  mockLoginUser, mockRegisterUser, mockToken, mockUserData,
} from '../../mocks/store/constants';

describe('authorization api', () => {
  const mock = new MockAdapter(axios);

  afterEach(() => {
    mock.reset();
  });

  describe('login call', () => {
    it('should return user', async () => {
      mock.onPost(`${process.env.API_URL}/login`).reply(200, mockUserData);

      const result = await fetchAuthorization(mockLoginUser);

      await waitFor(() => {
        expect(mock.history.post[0].url).toEqual(`${process.env.API_URL}/login`);
        expect(result).toEqual(mockUserData);
      });
    });
  });

  describe('register call', () => {
    it('should return user', async () => {
      mock.onPost(`${process.env.API_URL}/register`).reply(200, mockUserData);

      const result = await fetchRegistration(mockRegisterUser);

      await waitFor(() => {
        expect(mock.history.post[0].url).toEqual(`${process.env.API_URL}/register`);
        expect(result).toEqual(mockUserData);
      });
    });
  });

  describe('confirmation call', () => {
    it('should return user', async () => {
      mock.onPost(`${process.env.API_URL}/confirm-account`).reply(200, mockUserData);

      const result = await fetchUserConfirmation(mockToken);

      await waitFor(() => {
        expect(mock.history.post[0].url).toEqual(`${process.env.API_URL}/confirm-account`);
        expect(result).toEqual(mockUserData);
      });
    });
  });
});
