import { LOCATION_CHANGE, LocationChangeAction } from 'connected-react-router';
import { UserCategorie } from '../../types/user';
import { GetUserCategoriesActions } from '../actions/sendRequest/getInterestedCategories';
import { GetUserCategoriesActionTypes } from '../actionTypes';

export interface EventState {
  data: null | UserCategorie[],
  error: null | string,
  loading: boolean,
}

export const initialState: EventState = {
  data: null,
  error: null,
  loading: false,
};

const userCategories = (
  state = initialState,
  action: GetUserCategoriesActions | LocationChangeAction,
): EventState => {
  switch (action.type) {
    case GetUserCategoriesActionTypes.GET_USER_CATEGORIES:
      return {
        ...state,
        loading: true,
      };
    case GetUserCategoriesActionTypes.GET_USER_CATEGORIES_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case GetUserCategoriesActionTypes.GET_USER_CATEGORIES_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case LOCATION_CHANGE:
      return initialState;
    default:
      return state;
  }
};

export default userCategories;
