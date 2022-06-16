import { ClientsFormValues } from '../../../types/user';
import { ImportNewClientsActionTypes } from '../../actionTypes';

export interface ImportNewClientsAction {
  type: ImportNewClientsActionTypes.IMPORT_NEW_CLIENTS,
  payload: ClientsFormValues
}

interface ImportNewClientsSuccessAction {
  type: ImportNewClientsActionTypes.IMPORT_NEW_CLIENTS_SUCCESS,
  payload: string,
}

interface ImportNewClientsErrorAction {
  type: ImportNewClientsActionTypes.IMPORT_NEW_CLIENTS_ERROR,
  payload: string,
}

export type ImportNewClientsActions =
ImportNewClientsAction
| ImportNewClientsSuccessAction
| ImportNewClientsErrorAction;

const importNewClients = (data: ClientsFormValues): ImportNewClientsAction => ({
  type: ImportNewClientsActionTypes.IMPORT_NEW_CLIENTS,
  payload: data,
});

export const importNewClientsSuccess = (
  data: string,
): ImportNewClientsSuccessAction => ({
  type: ImportNewClientsActionTypes.IMPORT_NEW_CLIENTS_SUCCESS,
  payload: data,
});

export const importNewClientsError = (
  error: string,
): ImportNewClientsErrorAction => ({
  type: ImportNewClientsActionTypes.IMPORT_NEW_CLIENTS_ERROR,
  payload: error,
});

export default importNewClients;
