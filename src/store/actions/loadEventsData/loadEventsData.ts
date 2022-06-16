import { EventCategory } from '../../../types/events';
import { LoadEventsActionTypes } from '../../actionTypes';

export interface FetchEventsAction {
  type: LoadEventsActionTypes.LOAD_EVENTS,
}

interface FetchEventsSuccessAction {
  type: LoadEventsActionTypes.LOAD_EVENTS_SUCCESS,
  payload: EventCategory[],
}

interface FetchEventsFailedAction {
  type: LoadEventsActionTypes.LOAD_EVENTS_ERROR,
  payload: string,
}

export type LoadEventsActions =
FetchEventsAction | FetchEventsSuccessAction | FetchEventsFailedAction;

const loadEventsData = (): FetchEventsAction => ({
  type: LoadEventsActionTypes.LOAD_EVENTS,
});

export const loadEventsDataFailed = (error: string): FetchEventsFailedAction => ({
  type: LoadEventsActionTypes.LOAD_EVENTS_ERROR,
  payload: error,
});

export const loadEventsDataSuccess = (data: EventCategory[]): FetchEventsSuccessAction => ({
  type: LoadEventsActionTypes.LOAD_EVENTS_SUCCESS,
  payload: data,
});

export default loadEventsData;
