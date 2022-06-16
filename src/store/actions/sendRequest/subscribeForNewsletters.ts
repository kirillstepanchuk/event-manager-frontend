import { CategoriesData } from '../../../types/formData';
import { SubscribeToNewslettersActionTypes } from '../../actionTypes';

export interface SubscribeToNewslettersAction {
  type: SubscribeToNewslettersActionTypes.SUBSCRIBE_TO_NEWSLETTERS,
  payload: CategoriesData
}

interface SubscribeToNewslettersSuccessAction {
  type: SubscribeToNewslettersActionTypes.SUBSCRIBE_TO_NEWSLETTERS_SUCCESS,
  payload: string | null,
}

interface SubscribeToNewslettersErrorAction {
  type: SubscribeToNewslettersActionTypes.SUBSCRIBE_TO_NEWSLETTERS_ERROR,
  payload: string,
}

export type SubscribeToNewslettersActions =
SubscribeToNewslettersAction
| SubscribeToNewslettersSuccessAction
| SubscribeToNewslettersErrorAction;

const subscribeToNewsletters = (categories: CategoriesData): SubscribeToNewslettersAction => ({
  type: SubscribeToNewslettersActionTypes.SUBSCRIBE_TO_NEWSLETTERS,
  payload: categories,
});

export const subscribeToNewslettersSuccess = (
  message: string | null,
): SubscribeToNewslettersSuccessAction => ({
  type: SubscribeToNewslettersActionTypes.SUBSCRIBE_TO_NEWSLETTERS_SUCCESS,
  payload: message,
});

export const subscribeToNewslettersError = (
  error: string,
): SubscribeToNewslettersErrorAction => ({
  type: SubscribeToNewslettersActionTypes.SUBSCRIBE_TO_NEWSLETTERS_ERROR,
  payload: error,
});

export default subscribeToNewsletters;
