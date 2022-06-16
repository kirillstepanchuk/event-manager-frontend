import { LOCATION_CHANGE, LocationChangeAction } from 'connected-react-router';
import { EventSearchSuccessData } from '../../types/events';
import { LoadSearchedEventsActions } from '../actions/loadEventsData/loadSearchedEvents';
import { LoadSearchedEventsActionTypes } from '../actionTypes';

export interface EventsState {
  data: null | EventSearchSuccessData,
  error: string | null,
  loading: boolean,
}

export const initialState: EventsState = {
  data: null,
  error: null,
  loading: false,
};

const searchedEvents = (
  state = initialState,
  action: LoadSearchedEventsActions | LocationChangeAction,
): EventsState => {
  switch (action.type) {
    case LoadSearchedEventsActionTypes.LOAD_SEARCHED_EVENTS:
      return {
        ...state,
        loading: true,
      };
    case LoadSearchedEventsActionTypes.LOAD_SEARCHED_EVENTS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case LoadSearchedEventsActionTypes.LOAD_SEARCHED_EVENTS_SUCCESS:
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

export default searchedEvents;
