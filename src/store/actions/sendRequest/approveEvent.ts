import { ApproveEventActionTypes } from '../../actionTypes';

export interface ApproveEventAction {
  type: ApproveEventActionTypes.APPROVE_EVENT,
  payload: string
}

interface ApproveEventSuccessAction {
  type: ApproveEventActionTypes.APPROVE_EVENT_SUCCESS,
  payload: string,
}

interface ApproveEventErrorAction {
  type: ApproveEventActionTypes.APPROVE_EVENT_ERROR,
  payload: string,
}

export type ApproveEventActions =
ApproveEventAction
| ApproveEventSuccessAction
| ApproveEventErrorAction;

const approveEvent = (eventId: string): ApproveEventAction => ({
  type: ApproveEventActionTypes.APPROVE_EVENT,
  payload: eventId,
});

export const approveEventSuccess = (
  data: string,
): ApproveEventSuccessAction => ({
  type: ApproveEventActionTypes.APPROVE_EVENT_SUCCESS,
  payload: data,
});

export const approveEventError = (
  error: string,
): ApproveEventErrorAction => ({
  type: ApproveEventActionTypes.APPROVE_EVENT_ERROR,
  payload: error,
});

export default approveEvent;
