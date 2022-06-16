import { ConfirmEventsBookingActionTypes } from '../../actionTypes';

export interface ConfirmEventsBookingAction {
  type: ConfirmEventsBookingActionTypes.CONFIRM_EVENTS_BOOKING,
  payload: string
}

interface ConfirmEventsBookingSuccessAction {
  type: ConfirmEventsBookingActionTypes.CONFIRM_EVENTS_BOOKING_SUCCESS,
  payload: string | null,
}

interface ConfirmEventsBookingErrorAction {
  type: ConfirmEventsBookingActionTypes.CONFIRM_EVENTS_BOOKING_ERROR,
  payload: string,
}

export type ConfirmEventsBookingActions =
ConfirmEventsBookingAction
| ConfirmEventsBookingSuccessAction
| ConfirmEventsBookingErrorAction;

const confirmEventsBooking = (eventId: string): ConfirmEventsBookingAction => ({
  type: ConfirmEventsBookingActionTypes.CONFIRM_EVENTS_BOOKING,
  payload: eventId,
});

export const confirmEventsBookingSuccess = (
  message: string | null,
): ConfirmEventsBookingSuccessAction => ({
  type: ConfirmEventsBookingActionTypes.CONFIRM_EVENTS_BOOKING_SUCCESS,
  payload: message,
});

export const confirmEventsBookingError = (
  error: string,
): ConfirmEventsBookingErrorAction => ({
  type: ConfirmEventsBookingActionTypes.CONFIRM_EVENTS_BOOKING_ERROR,
  payload: error,
});

export default confirmEventsBooking;
