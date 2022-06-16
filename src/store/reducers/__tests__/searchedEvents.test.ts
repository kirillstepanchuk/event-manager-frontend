import searchedEvents, { initialState } from '../searchedEvents';
import loadSearchedEventsData, { loadSearchedEventsDataSuccess, loadSearchedEventsDataFailed } from '../../actions/loadEventsData/loadSearchedEvents';
import {
  mockError,
  mockEventsData,
  mockEventsSearchTitle, mockLocationChangePayload, mockPage, mockSearchedEventsData,
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
  data: mockSearchedEventsData,
};

describe('User reducer', () => {
  describe('loading should be true', () => {
    it('dispatch LOAD_EVENTS_DATA action', () => {
      const reducer = searchedEvents(
        loadingState,
        loadSearchedEventsData(mockEventsSearchTitle, mockPage),
      );
      expect(reducer).toEqual({
        ...initialState,
        loading: true,
      });
    });
  });

  describe('error should be', () => {
    it('dispatch LOAD_EVENTS_DATA_FAILED action', () => {
      const reducer = searchedEvents(errorState, loadSearchedEventsDataFailed(mockError));
      expect(reducer).toEqual({
        ...initialState,
        error: mockError,
      });
    });
  });

  describe('data should be', () => {
    it('dispatch LOAD_EVENTS_DATA_SUCCESS action', () => {
      const reducer = searchedEvents(
        dataState,
        loadSearchedEventsDataSuccess(mockEventsData, mockPage),
      );
      expect(reducer).toEqual({
        ...initialState,
        data: mockSearchedEventsData,
      });
    });
  });

  describe('dispatch LOCATION_CHANGE action', () => {
    it('without error in state', () => {
      const reducer = searchedEvents(dataState, locationChangeAction({ ...mockLocationChangePayload, action: 'POP' }));
      expect(reducer).toEqual(dataState);
    });

    it('with error in state', () => {
      const reducer = searchedEvents(errorState, locationChangeAction({ ...mockLocationChangePayload, action: 'POP' }));
      expect(reducer).toEqual(initialState);
    });
  });
});
