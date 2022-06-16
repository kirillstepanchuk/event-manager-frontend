import eventsCategory, { initialState } from '../eventsCategory';
import loadEventsCategoryData, { loadEventsCategoryDataSuccess, loadEventsCategoryDataFailed } from '../../actions/loadEventsData/loadCategorizedEventsData';
import {
  mockError,
  mockEventsData,
  mockEventsCategory, mockLocationChangePayload, mockPage, mockCategorizedEventsData,
} from '../../../mocks/store/constants';
import locationChangeAction from '../../../mocks/store/actions';

const loadingState = {
  ...initialState,
  loading: false,
};

const errorState = {
  ...initialState,
  error: mockError,
};

const dataState = {
  ...initialState,
  data: mockCategorizedEventsData,
};

describe('User reducer', () => {
  describe('loading should be true', () => {
    it('dispatch LOAD_EVENTS_DATA action', () => {
      const reducer = eventsCategory(
        loadingState,
        loadEventsCategoryData(mockEventsCategory, mockPage),
      );
      expect(reducer).toEqual({
        ...initialState,
        loading: true,
      });
    });
  });

  describe('error should be', () => {
    it('dispatch LOAD_EVENTS_DATA_FAILED action', () => {
      const reducer = eventsCategory(errorState, loadEventsCategoryDataFailed(mockError));
      expect(reducer).toEqual({
        ...initialState,
        error: mockError,
      });
    });
  });

  describe('data should be', () => {
    it('dispatch LOAD_EVENTS_DATA_SUCCESS action', () => {
      const reducer = eventsCategory(
        dataState,
        loadEventsCategoryDataSuccess(mockEventsData, mockPage),
      );
      expect(reducer).toEqual({
        ...initialState,
        data: mockCategorizedEventsData,
      });
    });
  });

  describe('dispatch LOCATION_CHANGE action', () => {
    it('without error in state', () => {
      const reducer = eventsCategory(dataState, locationChangeAction({ ...mockLocationChangePayload, action: 'POP' }));
      expect(reducer).toEqual(dataState);
    });

    it('with error in state', () => {
      const reducer = eventsCategory(errorState, locationChangeAction({ ...mockLocationChangePayload, action: 'POP' }));
      expect(reducer).toEqual(initialState);
    });
  });
});
