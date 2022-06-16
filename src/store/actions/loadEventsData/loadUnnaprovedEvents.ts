import { Event } from '../../../types/events';
import { LoadUnapprovedEventsActionTypes } from '../../actionTypes';

export interface LoadUnapprovedEventsAction {
  type: LoadUnapprovedEventsActionTypes.LOAD_UNNAPROVED_EVENTS,
}

interface LoadUnapprovedEventsSuccessAction {
  type: LoadUnapprovedEventsActionTypes.LOAD_UNNAPROVED_EVENTS_SUCCESS,
  payload: Event[],
}

interface LoadUnapprovedEventsErrorAction {
  type: LoadUnapprovedEventsActionTypes.LOAD_UNNAPROVED_EVENTS_ERROR,
  payload: string,
}

export type LoadUnapprovedEventsActions =
LoadUnapprovedEventsAction | LoadUnapprovedEventsSuccessAction | LoadUnapprovedEventsErrorAction;

const loadUnapprovedEvents = (): LoadUnapprovedEventsAction => ({
  type: LoadUnapprovedEventsActionTypes.LOAD_UNNAPROVED_EVENTS,
});

export const loadUnapprovedEventsError = (error: string): LoadUnapprovedEventsErrorAction => ({
  type: LoadUnapprovedEventsActionTypes.LOAD_UNNAPROVED_EVENTS_ERROR,
  payload: error,
});

export const loadUnapprovedEventsSuccess = (
  data: Event[],
): LoadUnapprovedEventsSuccessAction => ({
  type: LoadUnapprovedEventsActionTypes.LOAD_UNNAPROVED_EVENTS_SUCCESS,
  payload: data,
});

export default loadUnapprovedEvents;
