import profileEvents, { initialState } from '../profileEvents';
import loadProfileEventsData, { loadProfileEventsDataSuccess, loadProfileEventsDataFailed } from '../../actions/loadEventsData/loadProfileEvents';
import {
  mockError, mockEventsTypeData, mockEventsType, mockLocationChangePayload,
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
  data: mockEventsTypeData,
};

describe('User reducer', () => {
  describe('loading should be true', () => {
    it('dispatch LOAD_EVENTS_DATA action', () => {
      const reducer = profileEvents(loadingState, loadProfileEventsData(mockEventsType));
      expect(reducer).toEqual({
        ...initialState,
        loading: true,
      });
    });
  });

  describe('error should be', () => {
    it('dispatch LOAD_EVENTS_DATA_FAILED action', () => {
      const reducer = profileEvents(errorState, loadProfileEventsDataFailed(mockError));
      expect(reducer).toEqual({
        ...initialState,
        error: mockError,
      });
    });
  });

  describe('data should be', () => {
    it('dispatch LOAD_EVENTS_DATA_SUCCESS action', () => {
      const reducer = profileEvents(
        dataState,
        loadProfileEventsDataSuccess(mockEventsTypeData),
      );
      expect(reducer).toEqual({
        ...initialState,
        data: mockEventsTypeData,
      });
    });
  });

  it('dispatch LOCATION_CHANGE action', () => {
    const reducer = profileEvents(errorState, locationChangeAction({ ...mockLocationChangePayload, action: 'POP' }));
    expect(reducer).toEqual(initialState);
  });
});
