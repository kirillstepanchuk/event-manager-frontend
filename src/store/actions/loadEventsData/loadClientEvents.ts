import { EventsType } from '../../../types/events';
import { ClientEvents } from '../../../types/user';
import { LoadClientEventsActionTypes } from '../../actionTypes';

export interface LoadClientEventsAction {
  type: LoadClientEventsActionTypes.LOAD_CLIENT_EVENTS,
  payload: ClientEvents
}

interface LoadClientEventsSuccessAction {
  type: LoadClientEventsActionTypes.LOAD_CLIENT_EVENTS_SUCCESS,
  payload: EventsType,
}

interface LoadClientEventsErrorAction {
  type: LoadClientEventsActionTypes.LOAD_CLIENT_EVENTS_ERROR,
  payload: string,
}

export type LoadClientEventsActions =
LoadClientEventsAction | LoadClientEventsSuccessAction | LoadClientEventsErrorAction;

const loadClientEvents = (eventsType: ClientEvents): LoadClientEventsAction => ({
  type: LoadClientEventsActionTypes.LOAD_CLIENT_EVENTS,
  payload: eventsType,
});

export const loadClientEventsError = (error: string): LoadClientEventsErrorAction => ({
  type: LoadClientEventsActionTypes.LOAD_CLIENT_EVENTS_ERROR,
  payload: error,
});

export const loadClientEventsSuccess = (
  data: EventsType,
): LoadClientEventsSuccessAction => ({
  type: LoadClientEventsActionTypes.LOAD_CLIENT_EVENTS_SUCCESS,
  payload: data,
});

export default loadClientEvents;
