import { runSaga } from 'redux-saga';

import * as api from '../../../api/authorization.api';
import {
  mockError,
  mockLoginUser,
  mockRegisterUser,
  mockToken,
  mockUserData,
} from '../../../mocks/store/constants';
import { UserData } from '../../../types/user';
import confirmUser, { confirmUserSuccess, confirmUserFailed } from '../../actions/authorizeUser/confirmUser';
import { authorizeUser, registerUser, confirmNewUser } from '../authorizationWorker';
import loginUser, { loginUserFailed, loginUserSuccess } from '../../actions/authorizeUser/login';
import signupUser, { signupUserFailed, signupUserSuccess } from '../../actions/authorizeUser/signup';

describe('Authorization saga', () => {
  let fetchUser: jest.SpyInstance;

  afterEach(() => {
    fetchUser.mockClear();
  });

  describe('should put user in store', () => {
    it('login user', async () => {
      fetchUser = jest.spyOn(api, 'fetchAuthorization')
        .mockImplementation(() => Promise.resolve(mockUserData));

      const dispatched: UserData[] = [];

      await runSaga({
        dispatch: (action: UserData) => dispatched.push(action),
      }, authorizeUser, loginUser(mockLoginUser)).toPromise();

      expect(fetchUser).toHaveBeenCalledTimes(1);
      expect(dispatched[0]).toEqual(loginUserSuccess(mockUserData));
    });

    it('signup user', async () => {
      fetchUser = jest.spyOn(api, 'fetchRegistration')
        .mockImplementation(() => Promise.resolve(mockUserData));

      const dispatched: UserData[] = [];

      await runSaga({
        dispatch: (action: UserData) => dispatched.push(action),
      }, registerUser, signupUser(mockRegisterUser)).toPromise();

      expect(fetchUser).toHaveBeenCalledTimes(1);
      expect(dispatched[0]).toEqual(signupUserSuccess(mockUserData));
    });

    it('confirm user', async () => {
      fetchUser = jest.spyOn(api, 'fetchUserConfirmation')
        .mockImplementation(() => Promise.resolve(mockUserData));

      const dispatched: UserData[] = [];

      await runSaga({
        dispatch: (action: UserData) => dispatched.push(action),
      }, confirmNewUser, confirmUser(mockToken)).toPromise();

      expect(fetchUser).toHaveBeenCalledTimes(1);
      expect(dispatched[0]).toEqual(confirmUserSuccess(mockUserData));
    });
  });

  describe('should throw an error in catch block', () => {
    it('login user', async () => {
      fetchUser = jest.spyOn(api, 'fetchAuthorization')
        .mockImplementation(() => Promise.reject(mockError));

      const dispatched: UserData[] = [];

      await runSaga({
        dispatch: (action: UserData) => dispatched.push(action),
      }, authorizeUser, loginUser(mockLoginUser)).toPromise();

      expect(fetchUser).toHaveBeenCalledTimes(1);
      expect(dispatched[0]).toEqual(loginUserFailed(mockError));
    });

    it('signup user', async () => {
      fetchUser = jest.spyOn(api, 'fetchRegistration')
        .mockImplementation(() => Promise.reject(mockError));

      const dispatched: UserData[] = [];

      await runSaga({
        dispatch: (action: UserData) => dispatched.push(action),
      }, registerUser, signupUser(mockRegisterUser)).toPromise();

      expect(fetchUser).toHaveBeenCalledTimes(1);
      expect(dispatched[0]).toEqual(signupUserFailed(mockError));
    });

    it('confirm user', async () => {
      fetchUser = jest.spyOn(api, 'fetchUserConfirmation')
        .mockImplementation(() => Promise.reject(mockError));

      const dispatched: UserData[] = [];

      await runSaga({
        dispatch: (action: UserData) => dispatched.push(action),
      }, confirmNewUser, confirmUser(mockToken)).toPromise();

      expect(fetchUser).toHaveBeenCalledTimes(1);
      expect(dispatched[0]).toEqual(confirmUserFailed(mockError));
    });
  });
});
