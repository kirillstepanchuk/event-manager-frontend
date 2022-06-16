import { LOCATION_CHANGE, LocationChangeAction } from 'connected-react-router';
import { UserData } from '../../types/user';
import { GetCurrentUserActions } from '../actions/getUser/getUser';
import { AuthrorizeUserActions } from '../actions/authorizeUser/login';
import { LogoutActions } from '../actions/authorizeUser/logoutUser';
import { RegisterUserActions } from '../actions/authorizeUser/signup';
import {
  AuthorizeActionTypes,
  GetCurrentUserActionTypes,
  LogoutActionType,
  RegisterActionTypes,
  ConfirmUserActionTypes,
  EditUserActionTypes,
} from '../actionTypes';
import { getCookie } from '../../utils/cookiesUtils';
import { COOKIES } from '../../constants';
import { ConfirmUserActions } from '../actions/authorizeUser/confirmUser';
import { EditUserActions } from '../actions/getUser/editUser';

export const initialState: UserState = {
  data: null,
  error: null,
  loading: false,
  userCookie: getCookie(COOKIES.user),
};

type UserActionTypes = AuthrorizeUserActions
| RegisterUserActions
| GetCurrentUserActions
| EditUserActions
| LogoutActions
| LocationChangeAction
| ConfirmUserActions;

export interface UserState {
  data: UserData | null,
  error: string | null,
  loading: boolean,
  userCookie: null | string,
}

const authorizeUser = (state = initialState, action: UserActionTypes): UserState => {
  switch (action.type) {
    case EditUserActionTypes.EDIT_USER_DATA:
    case ConfirmUserActionTypes.CONFIRM_USER:
    case AuthorizeActionTypes.AUTHORIZE_USER:
    case RegisterActionTypes.REGISTER_USER:
    case GetCurrentUserActionTypes.GET_CURRENT_USER:
      return {
        ...state,
        loading: true,
      };
    case EditUserActionTypes.EDIT_USER_FAILED:
    case ConfirmUserActionTypes.CONFIRM_USER_ERROR:
    case AuthorizeActionTypes.AUTHORIZE_USER_ERROR:
    case RegisterActionTypes.REGISTER_USER_ERROR:
    case GetCurrentUserActionTypes.GET_CURRENT_USER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case AuthorizeActionTypes.AUTHORIZE_USER_SUCCESS:
    case RegisterActionTypes.REGISTER_USER_SUCCESS:
    case GetCurrentUserActionTypes.GET_CURRENT_USER_SUCCESS:
    case ConfirmUserActionTypes.CONFIRM_USER_SUCCESS:
    case EditUserActionTypes.EDIT_USER_SUCCESS:
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
    case LogoutActionType.LOGOUT_USER:
      return initialState;
    default:
      return state;
  }
};

export default authorizeUser;
