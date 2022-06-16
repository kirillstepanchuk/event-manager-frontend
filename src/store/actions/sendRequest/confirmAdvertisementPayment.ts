import { ConfirmEventAdvertisementActionTypes } from '../../actionTypes';

export interface ConfirmEventAdvertisementAction {
  type: ConfirmEventAdvertisementActionTypes.CONFIRM_EVENT_ADVERTISEMENT,
  payload: string
}

interface ConfirmEventAdvertisementSuccessAction {
  type: ConfirmEventAdvertisementActionTypes.CONFIRM_EVENT_ADVERTISEMENT_SUCCESS,
  payload: string,
}

interface ConfirmEventAdvertisementErrorAction {
  type: ConfirmEventAdvertisementActionTypes.CONFIRM_EVENT_ADVERTISEMENT_ERROR,
  payload: string,
}

export type ConfirmEventAdvertisementActions =
ConfirmEventAdvertisementAction
| ConfirmEventAdvertisementSuccessAction
| ConfirmEventAdvertisementErrorAction;

const confirmEventAdvertisement = (data: string): ConfirmEventAdvertisementAction => ({
  type: ConfirmEventAdvertisementActionTypes.CONFIRM_EVENT_ADVERTISEMENT,
  payload: data,
});

export const confirmEventAdvertisementSuccess = (
  data: string,
): ConfirmEventAdvertisementSuccessAction => ({
  type: ConfirmEventAdvertisementActionTypes.CONFIRM_EVENT_ADVERTISEMENT_SUCCESS,
  payload: data,
});

export const confirmEventAdvertisementError = (
  error: string,
): ConfirmEventAdvertisementErrorAction => ({
  type: ConfirmEventAdvertisementActionTypes.CONFIRM_EVENT_ADVERTISEMENT_ERROR,
  payload: error,
});

export default confirmEventAdvertisement;
