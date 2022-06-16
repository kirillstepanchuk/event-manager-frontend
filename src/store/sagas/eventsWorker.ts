import { put, call, takeEvery } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { push } from 'connected-react-router';

import handleError from '../../utils/errorHandler';
import { loadEventsDataFailed, loadEventsDataSuccess } from '../actions/loadEventsData/loadEventsData';
import {
  loadEvents,
  loadEventsCategory, loadMapEvents, loadSearchedEvents, loadProfileEvents, loadUnnaprovedEvents,
} from '../../api/events.api';
import {
  LoadEventsActionTypes,
  LoadEventsCategoryActionTypes,
  LoadMapEventsActionTypes,
  LoadSearchedEventsActionTypes,
  LoadProfileEventsActionTypes,
  LoadUnapprovedEventsActionTypes,
} from '../actionTypes';
import {
  Event, EventCategory, MapEvent, EventsType, EventCategorySuccessData, EventSearchSuccessData,
} from '../../types/events';
import { FetchEventsCategoryAction, loadEventsCategoryDataSuccess, loadEventsCategoryDataFailed } from '../actions/loadEventsData/loadCategorizedEventsData';
import { FetchSearchedEventsAction, loadSearchedEventsDataFailed, loadSearchedEventsDataSuccess } from '../actions/loadEventsData/loadSearchedEvents';
import { FetchMapEventsAction, loadMapEventsDataFailed, loadMapEventsDataSuccess } from '../actions/loadEventsData/loadMapEventsData';
import { ROUTE_PAGES } from '../../constants';
import { FetchProfileEventsAction, loadProfileEventsDataFailed, loadProfileEventsDataSuccess } from '../actions/loadEventsData/loadProfileEvents';
import { loadUnapprovedEventsError, loadUnapprovedEventsSuccess } from '../actions/loadEventsData/loadUnnaprovedEvents';

export function* fetchEvents(): SagaIterator<void> {
  try {
    const data:EventCategory[] = yield call(loadEvents);
    yield put(loadEventsDataSuccess(data));
  } catch (e) {
    yield put(loadEventsDataFailed(handleError(e)));
  }
}

export function* fetchEventsCategory(action: FetchEventsCategoryAction): SagaIterator<void> {
  try {
    const data:EventCategorySuccessData = yield call(loadEventsCategory, action.payload);
    yield put(loadEventsCategoryDataSuccess(data.events, data.pageCount));
  } catch (e) {
    yield put(loadEventsCategoryDataFailed(handleError(e)));
  }
}

export function* fetchSearchedEvents(action: FetchSearchedEventsAction): SagaIterator<void> {
  try {
    const data:EventSearchSuccessData = yield call(loadSearchedEvents, action.payload);
    yield put(loadSearchedEventsDataSuccess(data.events, data.pageCount));
    yield put(push(`${ROUTE_PAGES.searchedEvents}?title=${action.payload.title}`));
  } catch (e) {
    yield put(loadSearchedEventsDataFailed(handleError(e)));
  }
}

export function* fetchMapEvents(action: FetchMapEventsAction): SagaIterator<void> {
  try {
    const data:MapEvent[] = yield call(
      loadMapEvents,
      action.payload.radius,
      action.payload.position,
    );
    yield put(loadMapEventsDataSuccess(data));
  } catch (e) {
    yield put(loadMapEventsDataFailed(handleError(e)));
  }
}

export function* fetchProfileEvents(action: FetchProfileEventsAction): SagaIterator<void> {
  try {
    const data:EventsType = yield call(
      loadProfileEvents,
      action.payload,
    );
    yield put(loadProfileEventsDataSuccess(data));
  } catch (e) {
    yield put(loadProfileEventsDataFailed(handleError(e)));
  }
}

export function* fetchUnapprovedEvents(): SagaIterator<void> {
  try {
    const data:Event[] = yield call(loadUnnaprovedEvents);
    yield put(loadUnapprovedEventsSuccess(data));
  } catch (e) {
    yield put(loadUnapprovedEventsError(handleError(e)));
  }
}

export default function* eventsWatcher() {
  yield takeEvery(LoadProfileEventsActionTypes.LOAD_PROFILE_EVENTS, fetchProfileEvents);
  yield takeEvery(LoadMapEventsActionTypes.LOAD_MAP_EVENTS, fetchMapEvents);
  yield takeEvery(LoadSearchedEventsActionTypes.LOAD_SEARCHED_EVENTS, fetchSearchedEvents);
  yield takeEvery(LoadEventsCategoryActionTypes.LOAD_EVENTS_CATEGORY, fetchEventsCategory);
  yield takeEvery(LoadEventsActionTypes.LOAD_EVENTS, fetchEvents);
  yield takeEvery(LoadUnapprovedEventsActionTypes.LOAD_UNNAPROVED_EVENTS, fetchUnapprovedEvents);
}
