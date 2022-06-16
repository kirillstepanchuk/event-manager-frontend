import { EventsType } from '../../../types/events';
import { LoadProfileEventsActionTypes } from '../../actionTypes';

export interface FetchProfileEventsAction {
  type: LoadProfileEventsActionTypes.LOAD_PROFILE_EVENTS,
  payload: string
}

interface FetchProfileEventsSuccessAction {
  type: LoadProfileEventsActionTypes.LOAD_PROFILE_EVENTS_SUCCESS,
  payload: EventsType,
}

interface FetchProfileEventsFailedAction {
  type: LoadProfileEventsActionTypes.LOAD_PROFILE_EVENTS_ERROR,
  payload: string,
}

export type LoadProfileEventsActions =
FetchProfileEventsAction | FetchProfileEventsSuccessAction | FetchProfileEventsFailedAction;

const loadProfileEventsData = (eventsType: string): FetchProfileEventsAction => ({
  type: LoadProfileEventsActionTypes.LOAD_PROFILE_EVENTS,
  payload: eventsType,
});

export const loadProfileEventsDataFailed = (error: string): FetchProfileEventsFailedAction => ({
  type: LoadProfileEventsActionTypes.LOAD_PROFILE_EVENTS_ERROR,
  payload: error,
});

export const loadProfileEventsDataSuccess = (
  data: EventsType,
): FetchProfileEventsSuccessAction => ({
  type: LoadProfileEventsActionTypes.LOAD_PROFILE_EVENTS_SUCCESS,
  payload: data,
});

export default loadProfileEventsData;
