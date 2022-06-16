import { Event, EventCategorySuccessData } from '../../../types/events';
import { LoadEventsCategoryActionTypes } from '../../actionTypes';

export interface FetchEventsCategoryAction {
  type: LoadEventsCategoryActionTypes.LOAD_EVENTS_CATEGORY,
  payload: {
    category: string,
    page: number,
  }
}

interface FetchEventsCategorySuccessAction {
  type: LoadEventsCategoryActionTypes.LOAD_EVENTS_CATEGORY_SUCCESS,
  payload: EventCategorySuccessData,
}

interface FetchEventsCategoryFailedAction {
  type: LoadEventsCategoryActionTypes.LOAD_EVENTS_CATEGORY_ERROR,
  payload: string,
}

export type LoadEventsCategoryActions =
FetchEventsCategoryAction | FetchEventsCategorySuccessAction | FetchEventsCategoryFailedAction;

const loadEventsCategoryData = (category: string, page: number): FetchEventsCategoryAction => ({
  type: LoadEventsCategoryActionTypes.LOAD_EVENTS_CATEGORY,
  payload: {
    category,
    page,
  },
});

export const loadEventsCategoryDataFailed = (
  error: string,
): FetchEventsCategoryFailedAction => ({
  type: LoadEventsCategoryActionTypes.LOAD_EVENTS_CATEGORY_ERROR,
  payload: error,
});

export const loadEventsCategoryDataSuccess = (
  events: Event[],
  pageCount: number,
): FetchEventsCategorySuccessAction => ({
  type: LoadEventsCategoryActionTypes.LOAD_EVENTS_CATEGORY_SUCCESS,
  payload: {
    events,
    pageCount,
  },
});

export default loadEventsCategoryData;
