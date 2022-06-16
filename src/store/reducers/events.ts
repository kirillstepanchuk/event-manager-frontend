import { LOCATION_CHANGE, LocationChangeAction } from 'connected-react-router';
import { EventCategory } from '../../types/events';
import { LoadEventsActions } from '../actions/loadEventsData/loadEventsData';
import { LoadEventsActionTypes } from '../actionTypes';

export interface EventsState {
  data: null | EventCategory[],
  error: string | null,
  loading: boolean,
}

export const initialState: EventsState = {
  data: null,
  error: null,
  loading: false,
};

const events = (
  state = initialState,
  action: LoadEventsActions | LocationChangeAction,
): EventsState => {
  switch (action.type) {
    case LoadEventsActionTypes.LOAD_EVENTS:
      return {
        ...state,
        loading: true,
      };
    case LoadEventsActionTypes.LOAD_EVENTS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case LoadEventsActionTypes.LOAD_EVENTS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
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

export default events;
