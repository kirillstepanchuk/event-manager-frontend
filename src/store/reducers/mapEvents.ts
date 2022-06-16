import { LOCATION_CHANGE, LocationChangeAction } from 'connected-react-router';

import { MapEvent } from '../../types/events';
import { LoadMapEventsActions } from '../actions/loadEventsData/loadMapEventsData';
import { LoadMapEventsActionTypes } from '../actionTypes';

export interface EventsMapState {
  data: null | MapEvent[],
  error: string,
  loading: boolean,
}

export const initialState: EventsMapState = {
  data: null,
  error: '',
  loading: false,
};

const mapEvents = (
  state = initialState,
  action: LoadMapEventsActions | LocationChangeAction,
): EventsMapState => {
  switch (action.type) {
    case LoadMapEventsActionTypes.LOAD_MAP_EVENTS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case LoadMapEventsActionTypes.LOAD_MAP_EVENTS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case LoadMapEventsActionTypes.LOAD_MAP_EVENTS:
      return {
        ...state,
        loading: true,
      };
    case LOCATION_CHANGE:
      if (state.error) {
        return initialState;
      }
      return state;
    default:
      return state;
  }
};

export default mapEvents;
