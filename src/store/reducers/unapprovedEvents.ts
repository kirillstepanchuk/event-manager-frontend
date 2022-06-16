import { LOCATION_CHANGE, LocationChangeAction } from 'connected-react-router';
import { Event } from '../../types/events';
import { LoadUnapprovedEventsActions } from '../actions/loadEventsData/loadUnnaprovedEvents';
import { LoadUnapprovedEventsActionTypes } from '../actionTypes';

export interface EventsState {
  data: null | Event[],
  error: string | null,
  loading: boolean,
}

export const initialState: EventsState = {
  data: null,
  error: null,
  loading: false,
};

const unapprovedEvents = (
  state = initialState,
  action: LoadUnapprovedEventsActions | LocationChangeAction,
): EventsState => {
  switch (action.type) {
    case LoadUnapprovedEventsActionTypes.LOAD_UNNAPROVED_EVENTS:
      return {
        ...state,
        loading: true,
      };
    case LoadUnapprovedEventsActionTypes.LOAD_UNNAPROVED_EVENTS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case LoadUnapprovedEventsActionTypes.LOAD_UNNAPROVED_EVENTS_SUCCESS:
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

export default unapprovedEvents;
