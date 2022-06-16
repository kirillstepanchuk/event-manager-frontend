import { DeleteEventActionTypes } from '../../actionTypes';

export interface DeleteEventAction {
  type: DeleteEventActionTypes.DELETE_EVENT,
  payload: string
}

interface DeleteEventSuccessAction {
  type: DeleteEventActionTypes.DELETE_EVENT_SUCCESS,
  payload: string,
}

interface DeleteEventErrorAction {
  type: DeleteEventActionTypes.DELETE_EVENT_ERROR,
  payload: string,
}

export type DeleteEventActions =
DeleteEventAction
| DeleteEventSuccessAction
| DeleteEventErrorAction;

const deleteEvent = (eventId: string): DeleteEventAction => ({
  type: DeleteEventActionTypes.DELETE_EVENT,
  payload: eventId,
});

export const deleteEventSuccess = (
  data: string,
): DeleteEventSuccessAction => ({
  type: DeleteEventActionTypes.DELETE_EVENT_SUCCESS,
  payload: data,
});

export const deleteEventError = (
  error: string,
): DeleteEventErrorAction => ({
  type: DeleteEventActionTypes.DELETE_EVENT_ERROR,
  payload: error,
});

export default deleteEvent;
