import events, { initialState } from '../events';
import loadEventsData, { loadEventsDataSuccess, loadEventsDataFailed } from '../../actions/loadEventsData/loadEventsData';
import { mockError, mockEventsCategoriesData, mockLocationChangePayload } from '../../../mocks/store/constants';
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
  data: mockEventsCategoriesData,
};

describe('User reducer', () => {
  describe('loading should be true', () => {
    it('dispatch LOAD_EVENTS_DATA action', () => {
      const reducer = events(loadingState, loadEventsData());
      expect(reducer).toEqual({
        ...initialState,
        loading: true,
      });
    });
  });

  describe('error should be', () => {
    it('dispatch LOAD_EVENTS_DATA_FAILED action', () => {
      const reducer = events(errorState, loadEventsDataFailed(mockError));
      expect(reducer).toEqual({
        ...initialState,
        error: mockError,
      });
    });
  });

  describe('data should be', () => {
    it('dispatch LOAD_EVENTS_DATA_SUCCESSaction', () => {
      const reducer = events(dataState, loadEventsDataSuccess(mockEventsCategoriesData));
      expect(reducer).toEqual({
        ...initialState,
        data: mockEventsCategoriesData,
      });
    });
  });

  describe('dispatch LOCATION_CHANGE action', () => {
    it('without error in state', () => {
      const reducer = events(dataState, locationChangeAction({ ...mockLocationChangePayload, action: 'POP' }));
      expect(reducer).toEqual(dataState);
    });

    it('with error in state', () => {
      const reducer = events(errorState, locationChangeAction({ ...mockLocationChangePayload, action: 'POP' }));
      expect(reducer).toEqual(initialState);
    });
  });
});
