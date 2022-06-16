import authorizeUser, { initialState } from '../user';
import loginUser, { loginUserFailed, loginUserSuccess } from '../../actions/authorizeUser/login';
import signupUser, { signupUserFailed, signupUserSuccess } from '../../actions/authorizeUser/signup';
import getCurrentUser, { getCurrentUserFailed, getCurrentUserSuccess } from '../../actions/getUser/getUser';
import confirmUser, { confirmUserFailed, confirmUserSuccess } from '../../actions/authorizeUser/confirmUser';
import editUserData, { editUserFailed, editUserSuccess } from '../../actions/getUser/editUser';
import {
  mockError,
  mockUserData,
  mockLoginUser,
  mockRegisterUser,
  mockToken,
  mockUserEditData,
  mockLocationChangePayload,
} from '../../../mocks/store/constants';
import locationChangeAction from '../../../mocks/store/actions';

const loadingState = {
  ...initialState,
  loading: false,
};

const errorState = {
  ...initialState,
  error: mockError,
};

const dataState = {
  ...initialState,
  data: mockUserData,
};

describe('User reducer', () => {
  describe('loading should be true', () => {
    it('dispatch AUTHORIZE_USER_DATA action', () => {
      const reducer = authorizeUser(loadingState, loginUser(mockLoginUser));
      expect(reducer).toEqual({
        ...initialState,
        loading: true,
      });
    });

    it('dispatch REGISTER_USER_DATA action', () => {
      const reducer = authorizeUser(loadingState, signupUser(mockRegisterUser));
      expect(reducer).toEqual({
        ...initialState,
        loading: true,
      });
    });

    it('dispatch GET_CURRENT_USER_DATA action', () => {
      const reducer = authorizeUser(loadingState, getCurrentUser());
      expect(reducer).toEqual({
        ...initialState,
        loading: true,
      });
    });

    it('dispatch CONFIRM_USER_DATA action', () => {
      const reducer = authorizeUser(loadingState, confirmUser(mockToken));
      expect(reducer).toEqual({
        ...initialState,
        loading: true,
      });
    });

    it('dispatch EDIT_USER_DATA action', () => {
      const reducer = authorizeUser(loadingState, editUserData(mockUserEditData));
      expect(reducer).toEqual({
        ...initialState,
        loading: true,
      });
    });
  });

  describe('error should be', () => {
    it('dispatch AUTHORIZE_USER_FAILED action', () => {
      const reducer = authorizeUser(errorState, loginUserFailed(mockError));
      expect(reducer).toEqual({
        ...initialState,
        error: mockError,
      });
    });

    it('dispatch REGISTER_USER_FAILED action', () => {
      const reducer = authorizeUser(errorState, signupUserFailed(mockError));
      expect(reducer).toEqual({
        ...initialState,
        error: mockError,
      });
    });

    it('dispatch GET_CURRENT_USER_FAILED action', () => {
      const reducer = authorizeUser(errorState, getCurrentUserFailed(mockError));
      expect(reducer).toEqual({
        ...initialState,
        error: mockError,
      });
    });

    it('dispatch CONFIRM_USER_FAILED action', () => {
      const reducer = authorizeUser(loadingState, confirmUserFailed(mockError));
      expect(reducer).toEqual({
        ...initialState,
        error: mockError,
      });
    });

    it('dispatch EDIT_USER_FAILED  action', () => {
      const reducer = authorizeUser(loadingState, editUserFailed(mockError));
      expect(reducer).toEqual({
        ...initialState,
        error: mockError,
      });
    });
  });

  describe('data should be', () => {
    it('dispatch AUTHORIZE_USER_SUCCESS action', () => {
      const reducer = authorizeUser(dataState, loginUserSuccess(mockUserData));
      expect(reducer).toEqual({
        ...initialState,
        data: mockUserData,
      });
    });

    it('dispatch REGISTER_USER_SUCCESS action', () => {
      const reducer = authorizeUser(dataState, signupUserSuccess(mockUserData));
      expect(reducer).toEqual({
        ...initialState,
        data: mockUserData,
      });
    });

    it('dispatch GET_CURRENT_USER_SUCCESS action', () => {
      const reducer = authorizeUser(dataState, getCurrentUserSuccess(mockUserData));
      expect(reducer).toEqual({
        ...initialState,
        data: mockUserData,
      });
    });

    it('dispatch CONFIRM_USER_SUCCESS action', () => {
      const reducer = authorizeUser(loadingState, confirmUserSuccess(mockUserData));
      expect(reducer).toEqual({
        ...initialState,
        data: mockUserData,
      });
    });

    it('dispatch EDIT_USER_SUCCESS  action', () => {
      const reducer = authorizeUser(loadingState, editUserSuccess(mockUserData));
      expect(reducer).toEqual({
        ...initialState,
        data: mockUserData,
      });
    });
  });

  describe('dispatch LOCATION_CHANGE action', () => {
    it('without error in state', () => {
      const reducer = authorizeUser(dataState, locationChangeAction({ ...mockLocationChangePayload, action: 'POP' }));
      expect(reducer).toEqual(dataState);
    });

    it('with error in state', () => {
      const reducer = authorizeUser(errorState, locationChangeAction({ ...mockLocationChangePayload, action: 'POP' }));
      expect(reducer).toEqual(initialState);
    });
  });
});
