import { NewEventData } from '../../../types/events';
import { AddEventActionTypes } from '../../actionTypes';

export interface AddEventAction {
  type: AddEventActionTypes.ADD_EVENT,
  payload: NewEventData
}

interface AddEventSuccessAction {
  type: AddEventActionTypes.ADD_EVENT_SUCCESS,
  payload: string,
}

interface AddEventErrorAction {
  type: AddEventActionTypes.ADD_EVENT_ERROR,
  payload: string,
}

export type AddEventActions =
AddEventAction
| AddEventSuccessAction
| AddEventErrorAction;

const addNewEvent = (data: NewEventData): AddEventAction => ({
  type: AddEventActionTypes.ADD_EVENT,
  payload: data,
});

export const addNewEventSuccess = (
  data: string,
): AddEventSuccessAction => ({
  type: AddEventActionTypes.ADD_EVENT_SUCCESS,
  payload: data,
});

export const addNewEventError = (
  error: string,
): AddEventErrorAction => ({
  type: AddEventActionTypes.ADD_EVENT_ERROR,
  payload: error,
});

export default addNewEvent;
