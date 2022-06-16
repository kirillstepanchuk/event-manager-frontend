import event, { initialState } from '../event';
import loadEventData, { loadEventDataSuccess, loadEventDataFailed } from '../../actions/loadEventData/loadEventData';
import {
  mockError, mockEvent, mockEventId, mockLocationChangePayload,
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
  data: mockEvent,
};

describe('User reducer', () => {
  describe('loading should be true', () => {
    it('dispatch LOAD_EVENTS_DATA action', () => {
      const reducer = event(loadingState, loadEventData(mockEventId));
      expect(reducer).toEqual({
        ...initialState,
        loading: true,
      });
    });
  });

  describe('error should be', () => {
    it('dispatch LOAD_EVENTS_DATA_FAILED action', () => {
      const reducer = event(errorState, loadEventDataFailed(mockError));
      expect(reducer).toEqual({
        ...initialState,
        error: mockError,
      });
    });
  });

  describe('data should be', () => {
    it('dispatch LOAD_EVENTS_DATA_SUCCESS action', () => {
      const reducer = event(
        dataState,
        loadEventDataSuccess(mockEvent),
      );
      expect(reducer).toEqual({
        ...initialState,
        data: mockEvent,
      });
    });
  });

  it('dispatch LOCATION_CHANGE action', () => {
    const reducer = event(dataState, locationChangeAction({ ...mockLocationChangePayload, action: 'POP' }));
    expect(reducer).toEqual(initialState);
  });
});
