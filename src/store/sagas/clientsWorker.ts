import { put, call, takeEvery } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';

import { ClientData, UserDataPayloadSuccess } from '../../types/user';
import handleError from '../../utils/errorHandler';
import {
  BlockClientActionTypes,
  EditClientActionTypes,
  LoadClientActionTypes,
  LoadClientEventsActionTypes,
  LoadClientsActionTypes,
} from '../actionTypes';
import {
  fetchClients, fetchClient, fetchClientEvents, editClientData, blockClient,
} from '../../api/clients.api';
import { LoadClientsAction, loadClientsError, loadClientsSuccess } from '../actions/loadClientsData/loadClientsData';
import { getClientError, getClientSuccess, LoadClientAction } from '../actions/clientData/getClient';
import { LoadClientEventsAction, loadClientEventsError, loadClientEventsSuccess } from '../actions/loadEventsData/loadClientEvents';
import { EventsType } from '../../types/events';
import { EditClientAction, editClientError, editClientSuccess } from '../actions/clientData/editClient';
import { BlockClientAction, blockClientError, blockClientSuccess } from '../actions/clientData/blockClient';

export function* getClients(action: LoadClientsAction): SagaIterator<void> {
  try {
    const data:UserDataPayloadSuccess = yield call(fetchClients, action.payload);
    yield put(
      loadClientsSuccess(data.users, data.pageCount),
    );
  } catch (e) {
    yield put(
      loadClientsError(handleError(e)),
    );
  }
}

export function* getClientData(action: LoadClientAction): SagaIterator<void> {
  try {
    const data: ClientData = yield call(fetchClient, action.payload);
    yield put(
      getClientSuccess(data),
    );
  } catch (e) {
    yield put(
      getClientError(handleError(e)),
    );
  }
}

export function* getClientEvents(action: LoadClientEventsAction): SagaIterator<void> {
  try {
    const data: EventsType = yield call(fetchClientEvents, action.payload);
    yield put(
      loadClientEventsSuccess(data),
    );
  } catch (e) {
    yield put(
      loadClientEventsError(handleError(e)),
    );
  }
}

export function* editClient(action: EditClientAction): SagaIterator<void> {
  try {
    const data: ClientData = yield call(editClientData, action.payload);
    yield put(
      editClientSuccess(data),
    );
  } catch (e) {
    yield put(
      editClientError(handleError(e)),
    );
  }
}

export function* blockClientProfile(action: BlockClientAction): SagaIterator<void> {
  try {
    const data: string = yield call(blockClient, action.payload);
    yield put(
      blockClientSuccess(data),
    );
  } catch (e) {
    yield put(
      blockClientError(handleError(e)),
    );
  }
}

export default function* clientsWatcher() {
  yield takeEvery(LoadClientsActionTypes.LOAD_CLIENTS, getClients);
  yield takeEvery(LoadClientActionTypes.LOAD_CLIENT, getClientData);
  yield takeEvery(LoadClientEventsActionTypes.LOAD_CLIENT_EVENTS, getClientEvents);
  yield takeEvery(EditClientActionTypes.EDIT_CLIENT, editClient);
  yield takeEvery(BlockClientActionTypes.BLOCK_CLIENT, blockClientProfile);
}
