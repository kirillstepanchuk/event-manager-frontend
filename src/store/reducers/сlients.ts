import { LOCATION_CHANGE, LocationChangeAction } from 'connected-react-router';
import { UserDataPayloadSuccess } from '../../types/user';
import { LoadClientsActions } from '../actions/loadClientsData/loadClientsData';
import { LoadClientsActionTypes } from '../actionTypes';

export interface ClientsState {
  data: null | UserDataPayloadSuccess,
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
  action: LoadClientsActions | LocationChangeAction,
): ClientsState => {
  switch (action.type) {
    case LoadClientsActionTypes.LOAD_CLIENTS:
      return {
        ...state,
        loading: true,
      };
    case LoadClientsActionTypes.LOAD_CLIENTS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case LoadClientsActionTypes.LOAD_CLIENTS_SUCCESS:
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
