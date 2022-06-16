import { LOCATION_CHANGE, LocationChangeAction } from 'connected-react-router';
import { ClientData } from '../../types/user';
import { LoadClientActions } from '../actions/clientData/getClient';
import { EditClientActions } from '../actions/clientData/editClient';
import { LoadClientActionTypes, EditClientActionTypes } from '../actionTypes';

export interface ClientsState {
  data: ClientData | null,
  error: null | string,
  loading: boolean,
}

export const initialState: ClientsState = {
  data: null,
  error: null,
  loading: false,
};

const clients = (
  state = initialState,
  action: LoadClientActions | EditClientActions | LocationChangeAction,
): ClientsState => {
  switch (action.type) {
    case LoadClientActionTypes.LOAD_CLIENT:
    case EditClientActionTypes.EDIT_CLIENT:
      return {
        ...state,
        loading: true,
      };
    case LoadClientActionTypes.LOAD_CLIENT_ERROR:
    case EditClientActionTypes.EDIT_CLIENT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case LoadClientActionTypes.LOAD_CLIENT_SUCCESS:
    case EditClientActionTypes.EDIT_CLIENT_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case LOCATION_CHANGE:
      if (state.error) {
        return initialState;
      }
      return state;
    default:
      return state;
  }
};

export default clients;
