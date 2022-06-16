import { put, call, takeEvery } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';

import { UserData } from '../../types/user';
import { fetchCurrentUser, fetchEditUser } from '../../api/user.api';
import handleError from '../../utils/errorHandler';
import { getCurrentUserFailed, getCurrentUserSuccess } from '../actions/getUser/getUser';
import { EditUserAction, editUserFailed, editUserSuccess } from '../actions/getUser/editUser';
import { EditUserActionTypes, GetCurrentUserActionTypes } from '../actionTypes';

export function* getUser(): SagaIterator<void> {
  try {
    const data:UserData = yield call(fetchCurrentUser);
    yield put(
      getCurrentUserSuccess(data),
    );
  } catch (e) {
    yield put(
      getCurrentUserFailed(handleError(e)),
    );
  }
}

export function* editUser(action: EditUserAction): SagaIterator<void> {
  try {
    const data:UserData = yield call(fetchEditUser, action.payload);
    yield put(
      editUserSuccess(data),
    );
    window.location.reload();
  } catch (e) {
    yield put(
      editUserFailed(handleError(e)),
    );
  }
}

export default function* userWatcher() {
  yield takeEvery(GetCurrentUserActionTypes.GET_CURRENT_USER, getUser);
  yield takeEvery(EditUserActionTypes.EDIT_USER_DATA, editUser);
}
