import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';

import user from './user';
import event from './event';
import events from './events';
import eventsCategory from './eventsCategory';
import searchedEvents from './searchedEvents';
import mapEvents from './mapEvents';
import calendarEvent from './calendarEvent';
import profileEvents from './profileEvents';
import api from './api';
import unapprovedEvents from './unapprovedEvents';
import clients from './сlients';
import client from './client';
import clientEvents from './clientEvents';
import userCategories from './userCategories';
import userLocation from './userLocation';

export const history = createBrowserHistory();

const root = combineReducers({
  router: connectRouter(history),
  user,
  event,
  events,
  eventsCategory,
  searchedEvents,
  mapEvents,
  calendarEvent,
  profileEvents,
  api,
  unapprovedEvents,
  clients,
  client,
  clientEvents,
  userLocation,
  userCategories,
});

export type RootState = ReturnType<typeof root>;

export default root;
