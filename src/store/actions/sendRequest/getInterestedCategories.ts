import { UserCategorie } from '../../../types/user';
import { GetUserCategoriesActionTypes } from '../../actionTypes';

export interface GetUserCategoriesAction {
  type: GetUserCategoriesActionTypes.GET_USER_CATEGORIES,
  payload: string
}

interface GetUserCategoriesSuccessAction {
  type: GetUserCategoriesActionTypes.GET_USER_CATEGORIES_SUCCESS,
  payload: UserCategorie[] | null,
}

interface GetUserCategoriesErrorAction {
  type: GetUserCategoriesActionTypes.GET_USER_CATEGORIES_ERROR,
  payload: string,
}

export type GetUserCategoriesActions =
GetUserCategoriesAction
| GetUserCategoriesSuccessAction
| GetUserCategoriesErrorAction;

const getUserCategories = (userId: string): GetUserCategoriesAction => ({
  type: GetUserCategoriesActionTypes.GET_USER_CATEGORIES,
  payload: userId,
});

export const getUserCategoriesSuccess = (
  data: UserCategorie[] | null,
): GetUserCategoriesSuccessAction => ({
  type: GetUserCategoriesActionTypes.GET_USER_CATEGORIES_SUCCESS,
  payload: data,
});

export const getUserCategoriesError = (
  error: string,
): GetUserCategoriesErrorAction => ({
  type: GetUserCategoriesActionTypes.GET_USER_CATEGORIES_ERROR,
  payload: error,
});

export default getUserCategories;
