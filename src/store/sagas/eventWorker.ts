import { put, call, takeEvery } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';

import { loadEvent, createEventInCalendar } from '../../api/event.api';
import handleError from '../../utils/errorHandler';
import { FetchEventAction, loadEventDataSuccess, loadEventDataFailed } from '../actions/loadEventData/loadEventData';
import { AddEventInCalendarAction, addEventInCalendarError, addEventInCalendarSuccess } from '../actions/addEventInCalendar/addEventInCalendar';
import { LoadEventActionTypes, AddEventInCalendarActionTypes } from '../actionTypes';
import { Event } from '../../types/events';

export function* fetchEvent(action: FetchEventAction): SagaIterator<void> {
  try {
    const data:Event = yield call(loadEvent, action.payload);
    yield put(loadEventDataSuccess(data));
  } catch (e) {
    yield put(loadEventDataFailed(handleError(e)));
  }
}

export function* addEventToCalendar(action: AddEventInCalendarAction): SagaIterator<void> {
  try {
    const data:string = yield call(createEventInCalendar, action.payload.id, action.payload.code);
    yield put(addEventInCalendarSuccess(data));
  } catch (e) {
    yield put(addEventInCalendarError(handleError(e)));
  }
}

export default function* eventsWatcher() {
  yield takeEvery(LoadEventActionTypes.LOAD_EVENT, fetchEvent);
  yield takeEvery(AddEventInCalendarActionTypes.ADD_EVENT_IN_CALENDAR, addEventToCalendar);
}
