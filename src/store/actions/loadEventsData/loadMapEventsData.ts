import { MapEvent, Position } from '../../../types/events';
import { LoadMapEventsActionTypes } from '../../actionTypes';

export interface FetchMapEventsAction {
  type: LoadMapEventsActionTypes.LOAD_MAP_EVENTS,
  payload: {
    radius: number,
    position: Position,
  },
}

interface FetchMapEventsSuccessAction {
  type: LoadMapEventsActionTypes.LOAD_MAP_EVENTS_SUCCESS,
  payload: MapEvent[],
}

interface FetchMapEventsFailedAction {
  type: LoadMapEventsActionTypes.LOAD_MAP_EVENTS_ERROR,
  payload: string,
}

export type LoadMapEventsActions =
FetchMapEventsAction | FetchMapEventsSuccessAction | FetchMapEventsFailedAction;

const loadMapEventsData = (radius: number, position: Position): FetchMapEventsAction => ({
  type: LoadMapEventsActionTypes.LOAD_MAP_EVENTS,
  payload: {
    radius,
    position,
  },
});

export const loadMapEventsDataFailed = (error: string): FetchMapEventsFailedAction => ({
  type: LoadMapEventsActionTypes.LOAD_MAP_EVENTS_ERROR,
  payload: error,
});

export const loadMapEventsDataSuccess = (data: MapEvent[]): FetchMapEventsSuccessAction => ({
  type: LoadMapEventsActionTypes.LOAD_MAP_EVENTS_SUCCESS,
  payload: data,
});

export default loadMapEventsData;
