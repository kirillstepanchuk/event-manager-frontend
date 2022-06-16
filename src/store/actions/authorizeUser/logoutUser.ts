import { LogoutActionType } from '../../actionTypes';

export interface LogoutAction {
  type: LogoutActionType.LOGOUT_USER,
}

export type LogoutActions = LogoutAction;

const logoutUser = (): LogoutAction => ({
  type: LogoutActionType.LOGOUT_USER,
});

export default logoutUser;
