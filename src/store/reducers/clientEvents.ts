import { LOCATION_CHANGE, LocationChangeAction } from 'connected-react-router';
import { EventsType } from '../../types/events';
import { LoadClientEventsActions } from '../actions/loadEventsData/loadClientEvents';
import { LoadClientEventsActionTypes } from '../actionTypes';

export interface EventsState {
  data: null | EventsType,
  error: string | null,
  loading: boolean,
}

export const initialState: EventsState = {
  data: null,
  error: null,
  loading: false,
};

const clientEvents = (
  state = initialState,
  action: LoadClientEventsActions | LocationChangeAction,
): EventsState => {
  switch (action.type) {
    case LoadClientEventsActionTypes.LOAD_CLIENT_EVENTS:
      return {
        ...state,
        loading: true,
      };
    case LoadClientEventsActionTypes.LOAD_CLIENT_EVENTS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case LoadClientEventsActionTypes.LOAD_CLIENT_EVENTS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case LOCATION_CHANGE:
      return initialState;
    default:
      return state;
  }
};

export default clientEvents;
