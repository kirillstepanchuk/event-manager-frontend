import { all } from 'redux-saga/effects';
import authorizationWatcher from './authorizationWorker';
import eventsWatcher from './eventsWorker';
import eventWatcher from './eventWorker';
import userWatcher from './userWorker';
import apiWatcher from './apiWorker';
import clientsWatcher from './clientsWorker';
import locationWatcher from './locationWorker';

export default function* sagaWatcher() {
  yield all([
    authorizationWatcher(),
    eventsWatcher(),
    eventWatcher(),
    userWatcher(),
    apiWatcher(),
    clientsWatcher(),
    locationWatcher(),
  ]);
}
