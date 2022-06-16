import { NewEventData } from '../../../types/events';
import { EditEventActionTypes } from '../../actionTypes';

interface EditEventData {
  data: NewEventData
  id: string
}

export interface EditEventAction {
  type: EditEventActionTypes.EDIT_EVENT,
  payload: EditEventData
}

interface EditEventSuccessAction {
  type: EditEventActionTypes.EDIT_EVENT_SUCCESS,
  payload: string,
}

interface EditEventErrorAction {
  type: EditEventActionTypes.EDIT_EVENT_ERROR,
  payload: string,
}

export type EditEventActions =
EditEventAction
| EditEventSuccessAction
| EditEventErrorAction;

const editEvent = (data: EditEventData): EditEventAction => ({
  type: EditEventActionTypes.EDIT_EVENT,
  payload: data,
});

export const editEventSuccess = (
  data: string,
): EditEventSuccessAction => ({
  type: EditEventActionTypes.EDIT_EVENT_SUCCESS,
  payload: data,
});

export const editEventError = (
  error: string,
): EditEventErrorAction => ({
  type: EditEventActionTypes.EDIT_EVENT_ERROR,
  payload: error,
});

export default editEvent;
