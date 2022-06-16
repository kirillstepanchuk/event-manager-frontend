import { CloseAlertActionType } from '../../actionTypes';

export interface LogoutAction {
  type: CloseAlertActionType.CLOSE_ALERT,
}

export type CloseAlertActions = LogoutAction;

const closeAlert = (): LogoutAction => ({
  type: CloseAlertActionType.CLOSE_ALERT,
});

export default closeAlert;
