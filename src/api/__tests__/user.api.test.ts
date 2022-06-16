import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { waitFor } from '@testing-library/react';

import {
  fetchChangePassword, fetchCurrentUser, fetchEditUser, fetchUserCategories,
} from '../user.api';
import {
  mockAxiosResponse,
  mockChangePasswordData,
  mockUserCategories,
  mockUserData, mockUserEditData, mockUserId,
} from '../../mocks/store/constants';

describe('user api', () => {
  const mock = new MockAdapter(axios);

  afterEach(() => {
    mock.reset();
  });

  describe('change password call', () => {
    it('should return axios response with message', async () => {
      mock.onPost(`${process.env.API_URL}/change-password`).reply(200, mockAxiosResponse);

      const result = await fetchChangePassword(mockChangePasswordData);

      await waitFor(() => {
        expect(mock.history.post[0].url).toEqual(`${process.env.API_URL}/change-password`);
        expect(result.data.data.message).toEqual(mockAxiosResponse.data.message);
      });
    });
  });

  describe('get user call', () => {
    it('should return user data', async () => {
      mock.onGet(`${process.env.API_URL}/get-user`).reply(200, mockUserData);

      const result = await fetchCurrentUser();

      await waitFor(() => {
        expect(mock.history.get[0].url).toEqual(`${process.env.API_URL}/get-user`);
        expect(result).toEqual(mockUserData);
      });
    });
  });

  describe('edit user call', () => {
    it('should return user data', async () => {
      mock.onPost(`${process.env.API_URL}/edit-user`).reply(200, mockUserData);

      const result = await fetchEditUser(mockUserEditData);

      await waitFor(() => {
        expect(mock.history.post[0].url).toEqual(`${process.env.API_URL}/edit-user`);
        expect(result).toEqual(mockUserData);
      });
    });
  });

  describe('get interested call', () => {
    it('should return user cateegories', async () => {
      mock.onGet(`${process.env.API_URL}/get-interested-categories`).reply(200, mockUserCategories);

      const result = await fetchUserCategories(mockUserId.toString());

      await waitFor(() => {
        expect(mock.history.get[0].url).toEqual(`${process.env.API_URL}/get-interested-categories`);
        expect(result).toEqual(mockUserCategories);
      });
    });
  });
});
