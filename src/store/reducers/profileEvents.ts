import { LOCATION_CHANGE, LocationChangeAction } from 'connected-react-router';
import { EventsType } from '../../types/events';
import { LoadProfileEventsActions } from '../actions/loadEventsData/loadProfileEvents';
import { LoadProfileEventsActionTypes } from '../actionTypes';

export interface EventsState {
  data: null | EventsType,
  error: string,
  loading: boolean,
}

export const initialState: EventsState = {
  data: null,
  error: '',
  loading: false,
};

const profileEvents = (
  state = initialState,
  action: LoadProfileEventsActions | LocationChangeAction,
): EventsState => {
  switch (action.type) {
    case LoadProfileEventsActionTypes.LOAD_PROFILE_EVENTS:
      return {
        ...state,
        loading: true,
      };
    case LoadProfileEventsActionTypes.LOAD_PROFILE_EVENTS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case LoadProfileEventsActionTypes.LOAD_PROFILE_EVENTS_SUCCESS:
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

export default profileEvents;
