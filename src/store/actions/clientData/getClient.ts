import { ClientData } from '../../../types/user';
import { LoadClientActionTypes } from '../../actionTypes';

export interface LoadClientAction {
  type: LoadClientActionTypes.LOAD_CLIENT,
  payload: string
}

interface LoadClientSuccessAction {
  type: LoadClientActionTypes.LOAD_CLIENT_SUCCESS,
  payload: ClientData,
}

interface LoadClientErrorAction {
  type: LoadClientActionTypes.LOAD_CLIENT_ERROR,
  payload: string,
}

export type LoadClientActions =
LoadClientAction | LoadClientSuccessAction | LoadClientErrorAction;

const getClient = (eventId: string): LoadClientAction => ({
  type: LoadClientActionTypes.LOAD_CLIENT,
  payload: eventId,
});

export const getClientSuccess = (user: ClientData): LoadClientSuccessAction => ({
  type: LoadClientActionTypes.LOAD_CLIENT_SUCCESS,
  payload: user,
});

export const getClientError = (error: string): LoadClientErrorAction => ({
  type: LoadClientActionTypes.LOAD_CLIENT_ERROR,
  payload: error,
});

export default getClient;
