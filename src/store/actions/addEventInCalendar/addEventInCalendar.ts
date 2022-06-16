import { AddEventInCalendarActionTypes } from '../../actionTypes';

export interface AddEventInCalendarPayload {
  id: string,
  code: string,
}

export interface AddEventInCalendarAction {
  type: AddEventInCalendarActionTypes.ADD_EVENT_IN_CALENDAR,
  payload: AddEventInCalendarPayload,
}

interface AddEventInCalendarSuccessAction {
  type: AddEventInCalendarActionTypes.ADD_EVENT_IN_CALENDAR_SUCCESS,
  payload: string,
}

interface AddEventInCalendarErrorAction {
  type: AddEventInCalendarActionTypes.ADD_EVENT_IN_CALENDAR_ERROR,
  payload: string,
}

interface CloseNotification {
  type: AddEventInCalendarActionTypes.CLOSE_NOTIFICATION,
}

export type AddEventInCalendarActions =
AddEventInCalendarAction
| AddEventInCalendarSuccessAction
| AddEventInCalendarErrorAction
| CloseNotification;

const addEventInCalendar = (id: string, code: string): AddEventInCalendarAction => ({
  type: AddEventInCalendarActionTypes.ADD_EVENT_IN_CALENDAR,
  payload: {
    id,
    code,
  },
});

export const addEventInCalendarError = (error: string): AddEventInCalendarErrorAction => ({
  type: AddEventInCalendarActionTypes.ADD_EVENT_IN_CALENDAR_ERROR,
  payload: error,
});

export const addEventInCalendarSuccess = (data: string): AddEventInCalendarSuccessAction => ({
  type: AddEventInCalendarActionTypes.ADD_EVENT_IN_CALENDAR_SUCCESS,
  payload: data,
});

export const closeCalendarNotification = (): CloseNotification => ({
  type: AddEventInCalendarActionTypes.CLOSE_NOTIFICATION,
});

export default addEventInCalendar;
