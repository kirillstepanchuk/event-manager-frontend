import { put, call, takeEvery } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import {
  GetUserLocationActionTypes,
} from '../actionTypes';
import { Position } from '../../types/events';
import { getUserLocationError, getUserLocationSuccess } from '../actions/loadUserLocation/getUserLocation';
import { DEFAULT_CENTER } from '../../constants';
import getBrowserLocation from '../../utils/geolocation';

export function* getLocation(): SagaIterator<void> {
  try {
    const data:Position = yield call(getBrowserLocation);
    yield put(
      getUserLocationSuccess(data),
    );
  } catch (e: unknown) {
    yield put(
      getUserLocationError(DEFAULT_CENTER),
    );
  }
}

export default function* locationWtcher() {
  yield takeEvery(GetUserLocationActionTypes.GET_USER_LOCATION, getLocation);
}
