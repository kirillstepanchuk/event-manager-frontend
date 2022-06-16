import { Position } from '../../../types/events';
import { GetUserLocationActionTypes } from '../../actionTypes';

interface GetUserLocationAction {
  type: GetUserLocationActionTypes.GET_USER_LOCATION
}

interface GetUserLocationSuccessAction {
  type: GetUserLocationActionTypes.GET_USER_LOCATION_SUCCESS
  payload: Position
}

interface GetUserLocationErrorAction {
  type: GetUserLocationActionTypes.GET_USER_LOCATION_ERROR
  payload: Position
}

export type GetUserLocationActions =
GetUserLocationAction
| GetUserLocationSuccessAction
| GetUserLocationErrorAction;

const getUserLocation = (): GetUserLocationAction => ({
  type: GetUserLocationActionTypes.GET_USER_LOCATION,
});

export const getUserLocationSuccess = (data: Position): GetUserLocationSuccessAction => ({
  type: GetUserLocationActionTypes.GET_USER_LOCATION_SUCCESS,
  payload: data,
});

export const getUserLocationError = (
  defaultLocation: Position,
): GetUserLocationErrorAction => ({
  type: GetUserLocationActionTypes.GET_USER_LOCATION_ERROR,
  payload: defaultLocation,
});

export default getUserLocation;
