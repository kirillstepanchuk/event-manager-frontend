import { GetUserLocationActions } from '../actions/loadUserLocation/getUserLocation';
import { GetUserLocationActionTypes } from '../actionTypes';
import { Position } from '../../types/events';

interface LocationState {
  data: null | Position
  error: null | Position
  loading: boolean
}

const initialState: LocationState = {
  data: null,
  error: null,
  loading: false,
};

const location = (state = initialState, action: GetUserLocationActions): LocationState => {
  switch (action.type) {
    case GetUserLocationActionTypes.GET_USER_LOCATION_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case GetUserLocationActionTypes.GET_USER_LOCATION_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case GetUserLocationActionTypes.GET_USER_LOCATION:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default location;
