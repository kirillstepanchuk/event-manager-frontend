import { LOCATION_CHANGE, LocationChangeAction } from 'connected-react-router';
import { Event } from '../../types/events';
import { LoadEventActions } from '../actions/loadEventData/loadEventData';
import { LoadEventActionTypes } from '../actionTypes';

export interface EventState {
  data: null | Event,
  error: string,
  loading: boolean,
}

export const initialState: EventState = {
  data: null,
  error: '',
  loading: false,
};

const event = (
  state = initialState,
  action: LoadEventActions | LocationChangeAction,
): EventState => {
  switch (action.type) {
    case LoadEventActionTypes.LOAD_EVENT:
      return {
        ...state,
        loading: true,
      };
    case LoadEventActionTypes.LOAD_EVENT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case LoadEventActionTypes.LOAD_EVENT_SUCCESS:
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

export default event;
