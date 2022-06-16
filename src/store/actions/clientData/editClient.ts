import { EditClientData, ClientData } from '../../../types/user';
import { EditClientActionTypes } from '../../actionTypes';

export interface EditClientAction {
  type: EditClientActionTypes.EDIT_CLIENT,
  payload: EditClientData
}

interface EditClientSuccessAction {
  type: EditClientActionTypes.EDIT_CLIENT_SUCCESS
  payload: ClientData
}

interface EditClientErrorAction {
  type: EditClientActionTypes.EDIT_CLIENT_ERROR
  payload: string
}

export type EditClientActions =
EditClientAction
| EditClientSuccessAction
| EditClientErrorAction;

const editClient = (data: EditClientData): EditClientAction => ({
  type: EditClientActionTypes.EDIT_CLIENT,
  payload: data,
});

export const editClientSuccess = (message: ClientData): EditClientSuccessAction => ({
  type: EditClientActionTypes.EDIT_CLIENT_SUCCESS,
  payload: message,
});

export const editClientError = (error: string): EditClientErrorAction => ({
  type: EditClientActionTypes.EDIT_CLIENT_ERROR,
  payload: error,
});

export default editClient;
