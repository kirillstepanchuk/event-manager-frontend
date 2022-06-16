import { Event } from '../../../types/events';
import { LoadEventActionTypes } from '../../actionTypes';

export interface FetchEventAction {
  type: LoadEventActionTypes.LOAD_EVENT,
  payload: string
}

interface FetchEventSuccessAction {
  type: LoadEventActionTypes.LOAD_EVENT_SUCCESS,
  payload: Event,
}

interface FetchEventFailedAction {
  type: LoadEventActionTypes.LOAD_EVENT_ERROR,
  payload: string,
}

export type LoadEventActions =
FetchEventAction | FetchEventSuccessAction | FetchEventFailedAction;

const loadEventData = (eventId: string): FetchEventAction => ({
  type: LoadEventActionTypes.LOAD_EVENT,
  payload: eventId,
});

export const loadEventDataFailed = (error: string): FetchEventFailedAction => ({
  type: LoadEventActionTypes.LOAD_EVENT_ERROR,
  payload: error,
});

export const loadEventDataSuccess = (data: Event): FetchEventSuccessAction => ({
  type: LoadEventActionTypes.LOAD_EVENT_SUCCESS,
  payload: data,
});

export default loadEventData;
