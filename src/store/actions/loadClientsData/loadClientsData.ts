import { ClientData } from '../../../types/user';
import { LoadClientsActionTypes } from '../../actionTypes';

export interface LoadClientsAction {
  type: LoadClientsActionTypes.LOAD_CLIENTS,
  payload: {
    page: number,
    role: string,
    blocked: string,
    title: string,
  }
}

interface LoadClientsSuccessAction {
  type: LoadClientsActionTypes.LOAD_CLIENTS_SUCCESS,
  payload: {
    users: ClientData[],
    pageCount: number,
  }
}

interface LoadClientsErrorAction {
  type: LoadClientsActionTypes.LOAD_CLIENTS_ERROR,
  payload: string,
}

export type LoadClientsActions =
LoadClientsAction | LoadClientsSuccessAction | LoadClientsErrorAction;

const loadClients = (
  page: number,
  role: string,
  blocked: string,
  title: string,
): LoadClientsAction => ({
  type: LoadClientsActionTypes.LOAD_CLIENTS,
  payload: {
    page,
    role,
    blocked,
    title,
  },
});

export const loadClientsSuccess = (
  users: ClientData[],
  pageCount: number,
): LoadClientsSuccessAction => ({
  type: LoadClientsActionTypes.LOAD_CLIENTS_SUCCESS,
  payload: {
    users,
    pageCount,
  },
});

export const loadClientsError = (error: string): LoadClientsErrorAction => ({
  type: LoadClientsActionTypes.LOAD_CLIENTS_ERROR,
  payload: error,
});

export default loadClients;
