import { Event } from '../../../types/events';
import { LoadSearchedEventsActionTypes } from '../../actionTypes';

export interface FetchSearchedEventsAction {
  type: LoadSearchedEventsActionTypes.LOAD_SEARCHED_EVENTS,
  payload: {
    title: string,
    page: number,
  }
}

interface FetchSearchedEventsSuccessAction {
  type: LoadSearchedEventsActionTypes.LOAD_SEARCHED_EVENTS_SUCCESS,
  payload: {
    events: Event[],
    pageCount: number,
  },
}

interface FetchSearchedEventsFailedAction {
  type: LoadSearchedEventsActionTypes.LOAD_SEARCHED_EVENTS_ERROR,
  payload: string,
}

export type LoadSearchedEventsActions =
FetchSearchedEventsAction | FetchSearchedEventsSuccessAction | FetchSearchedEventsFailedAction;

const loadSearchedEventsData = (title: string, page: number): FetchSearchedEventsAction => ({
  type: LoadSearchedEventsActionTypes.LOAD_SEARCHED_EVENTS,
  payload: {
    title,
    page,
  },
});

export const loadSearchedEventsDataFailed = (
  error: string,
): FetchSearchedEventsFailedAction => ({
  type: LoadSearchedEventsActionTypes.LOAD_SEARCHED_EVENTS_ERROR,
  payload: error,
});

export const loadSearchedEventsDataSuccess = (
  events: Event[],
  pageCount: number,
): FetchSearchedEventsSuccessAction => ({
  type: LoadSearchedEventsActionTypes.LOAD_SEARCHED_EVENTS_SUCCESS,
  payload: {
    events,
    pageCount,
  },
});

export default loadSearchedEventsData;
