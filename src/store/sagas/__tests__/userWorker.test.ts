import { runSaga } from 'redux-saga';

import * as api from '../../../api/user.api';
import {
  mockError,
  mockUserEditData,
  mockUserData,
} from '../../../mocks/store/constants';
import { getUser, editUser } from '../userWorker';
import { UserData, EditUserData } from '../../../types/user';
import { getCurrentUserFailed, getCurrentUserSuccess } from '../../actions/getUser/getUser';
import editUserData, { editUserFailed, editUserSuccess } from '../../actions/getUser/editUser';

describe('user saga', () => {
  let fetchUser: jest.SpyInstance;

  afterEach(() => {
    fetchUser.mockClear();
  });

  describe('should put user data in store', () => {
    it('get user', async () => {
      fetchUser = jest.spyOn(api, 'fetchCurrentUser')
        .mockImplementation(() => Promise.resolve(mockUserData));

      const dispatched: UserData[] = [];

      await runSaga({
        dispatch: (action: UserData) => dispatched.push(action),
      }, getUser).toPromise();

      expect(fetchUser).toHaveBeenCalledTimes(1);
      expect(dispatched[0]).toEqual(getCurrentUserSuccess(mockUserData));
    });

    it('edit user', async () => {
      fetchUser = jest.spyOn(api, 'fetchEditUser')
        .mockImplementation(() => Promise.resolve(mockUserData));

      const dispatched: EditUserData[] = [];

      await runSaga({
        dispatch: (action: EditUserData) => dispatched.push(action),
      }, editUser, editUserData(mockUserEditData)).toPromise();

      expect(fetchUser).toHaveBeenCalledTimes(1);
      expect(dispatched[0]).toEqual(editUserSuccess(mockUserData));
    });
  });

  describe('should put error in catch block', () => {
    it('get user', async () => {
      fetchUser = jest.spyOn(api, 'fetchCurrentUser')
        .mockImplementation(() => Promise.reject(mockError));

      const dispatched: UserData[] = [];

      await runSaga({
        dispatch: (action: UserData) => dispatched.push(action),
      }, getUser).toPromise();

      expect(fetchUser).toHaveBeenCalledTimes(1);
      expect(dispatched[0]).toEqual(getCurrentUserFailed(mockError));
    });

    it('edit user', async () => {
      fetchUser = jest.spyOn(api, 'fetchEditUser')
        .mockImplementation(() => Promise.reject(mockError));

      const dispatched: EditUserData[] = [];

      await runSaga({
        dispatch: (action: EditUserData) => dispatched.push(action),
      }, editUser, editUserData(mockUserEditData)).toPromise();

      expect(fetchUser).toHaveBeenCalledTimes(1);
      expect(dispatched[0]).toEqual(editUserFailed(mockError));
    });
  });
});
