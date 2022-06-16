import { BlockClientActionTypes } from '../../actionTypes';

export interface BlockClientAction {
  type: BlockClientActionTypes.BLOCK_CLIENT,
  payload: string
}

interface BlockClientSuccessAction {
  type: BlockClientActionTypes.BLOCK_CLIENT_SUCCESS
  payload: string
}

interface BlockClientErrorAction {
  type: BlockClientActionTypes.BLOCK_CLIENT_ERROR
  payload: string
}

export type BlockClientActions =
BlockClientAction
| BlockClientSuccessAction
| BlockClientErrorAction;

const blockClient = (clientId: string): BlockClientAction => ({
  type: BlockClientActionTypes.BLOCK_CLIENT,
  payload: clientId,
});

export const blockClientSuccess = (message: string): BlockClientSuccessAction => ({
  type: BlockClientActionTypes.BLOCK_CLIENT_SUCCESS,
  payload: message,
});

export const blockClientError = (error: string): BlockClientErrorAction => ({
  type: BlockClientActionTypes.BLOCK_CLIENT_ERROR,
  payload: error,
});

export default blockClient;
