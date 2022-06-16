import { LOCATION_CHANGE, LocationChangeAction } from 'connected-react-router';
import { EventCategorySuccessData } from '../../types/events';
import { LoadEventsCategoryActions } from '../actions/loadEventsData/loadCategorizedEventsData';
import { LoadEventsCategoryActionTypes } from '../actionTypes';

export interface EventsState {
  data: null | EventCategorySuccessData,
  error: string | null,
  loading: boolean,
}

export const initialState: EventsState = {
  data: null,
  error: null,
  loading: false,
};

const eventsCategory = (
  state = initialState,
  action: LoadEventsCategoryActions | LocationChangeAction,
): EventsState => {
  switch (action.type) {
    case LoadEventsCategoryActionTypes.LOAD_EVENTS_CATEGORY:
      return {
        ...state,
        loading: true,
      };
    case LoadEventsCategoryActionTypes.LOAD_EVENTS_CATEGORY_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case LoadEventsCategoryActionTypes.LOAD_EVENTS_CATEGORY_SUCCESS:
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
    default:
      return state;
  }
};

export default eventsCategory;
