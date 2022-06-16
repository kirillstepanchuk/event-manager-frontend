import { put, call, takeEvery } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { SagaIterator } from 'redux-saga';

import { loginUserSuccess, loginUserFailed, AuthrorizeUserAction } from '../actions/authorizeUser/login';
import { signupUserSuccess, signupUserFailed, RegisterUserAction } from '../actions/authorizeUser/signup';
import { UserData } from '../../types/user';
import {
  fetchRegistration, fetchAuthorization, fetchUserConfirmation,
} from '../../api/authorization.api';
import {
  AuthorizeActionTypes,
  ConfirmUserActionTypes,
  LogoutActionType,
  RegisterActionTypes,
} from '../actionTypes';
import handleError from '../../utils/errorHandler';
import { setCookie, deleteCookie } from '../../utils/cookiesUtils';
import { COOKIES, ROUTE_PAGES } from '../../constants';
import { ConfirmUserAction, confirmUserFailed, confirmUserSuccess } from '../actions/authorizeUser/confirmUser';

const deleteUserCookies = () => {
  deleteCookie(COOKIES.user);
  deleteCookie(COOKIES.token);
  deleteCookie(COOKIES.notifications);
};

export function* authorizeUser(action: AuthrorizeUserAction): SagaIterator<void> {
  try {
    const data:UserData = yield call(
      fetchAuthorization,
      action.payload,
    );
    yield put(
      loginUserSuccess(data),
    );
    yield call(setCookie, COOKIES.user, data.userId);
    yield call(setCookie, COOKIES.token, data.token);
    yield put(push(ROUTE_PAGES.main));
  } catch (e: unknown) {
    yield put(
      loginUserFailed(handleError(e)),
    );
  }
}

export function* registerUser(action: RegisterUserAction): SagaIterator<void> {
  try {
    const data:UserData = yield call(fetchRegistration, action.payload);
    yield put(
      signupUserSuccess(data),
    );
    yield put(push(ROUTE_PAGES.checkEmail));
  } catch (e: unknown) {
    yield put(
      signupUserFailed(handleError(e)),
    );
  }
}

export function* confirmNewUser(action: ConfirmUserAction): SagaIterator<void> {
  try {
    const data:UserData = yield call(fetchUserConfirmation, action.payload);
    yield put(
      confirmUserSuccess(data),
    );
  } catch (e) {
    yield put(
      confirmUserFailed(handleError(e)),
    );
  }
}

export function* logoutUser(): SagaIterator<void> {
  yield call(deleteUserCookies);
  yield put(push(ROUTE_PAGES.main));
}

export default function* authorizationWatcher() {
  yield takeEvery(LogoutActionType.LOGOUT_USER, logoutUser);
  yield takeEvery(ConfirmUserActionTypes.CONFIRM_USER, confirmNewUser);
  yield takeEvery(AuthorizeActionTypes.AUTHORIZE_USER, authorizeUser);
  yield takeEvery(RegisterActionTypes.REGISTER_USER, registerUser);
}
