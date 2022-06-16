import { LOCATION_CHANGE, LocationChangeAction } from 'connected-react-router';
import { AddEventInCalendarActions, AddEventInCalendarPayload } from '../actions/addEventInCalendar/addEventInCalendar';
import { AddEventInCalendarActionTypes } from '../actionTypes';

export interface EventState {
  data: null | string | AddEventInCalendarPayload,
  error: null | string,
  loading: boolean,
}

export const initialState: EventState = {
  data: null,
  error: null,
  loading: false,
};

const calendarEvent = (
  state = initialState,
  action: AddEventInCalendarActions | LocationChangeAction,
): EventState => {
  switch (action.type) {
    case AddEventInCalendarActionTypes.ADD_EVENT_IN_CALENDAR:
      return {
        ...state,
        loading: true,
      };
    case AddEventInCalendarActionTypes.ADD_EVENT_IN_CALENDAR_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case AddEventInCalendarActionTypes.ADD_EVENT_IN_CALENDAR_SUCCESS:
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
    case AddEventInCalendarActionTypes.CLOSE_NOTIFICATION:
      return initialState;
    default:
      return state;
  }
};

export default calendarEvent;
