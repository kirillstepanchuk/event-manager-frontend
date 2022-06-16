import mapEvents, { initialState } from '../mapEvents';
import loadMapEventsData, { loadMapEventsDataSuccess, loadMapEventsDataFailed } from '../../actions/loadEventsData/loadMapEventsData';
import {
  mockError, mockEventsData, mockLocationChangePayload, mockMapData,
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
  data: mockEventsData,
};

describe('User reducer', () => {
  describe('loading should be true', () => {
    it('dispatch LOAD_EVENTS_DATA action', () => {
      const reducer = mapEvents(loadingState, loadMapEventsData(
        mockMapData.radius,
        mockMapData.position,
      ));
      expect(reducer).toEqual({
        ...initialState,
        loading: true,
      });
    });
  });

  describe('error should be', () => {
    it('dispatch LOAD_EVENTS_DATA_FAILED action', () => {
      const reducer = mapEvents(errorState, loadMapEventsDataFailed(mockError));
      expect(reducer).toEqual({
        ...initialState,
        error: mockError,
      });
    });
  });

  describe('data should be', () => {
    it('dispatch LOAD_EVENTS_DATA_SUCCESS action', () => {
      const reducer = mapEvents(
        dataState,
        loadMapEventsDataSuccess(mockEventsData),
      );
      expect(reducer).toEqual({
        ...initialState,
        data: mockEventsData,
      });
    });
  });

  describe('dispatch LOCATION_CHANGE action', () => {
    it('without error in state', () => {
      const reducer = mapEvents(dataState, locationChangeAction({ ...mockLocationChangePayload, action: 'POP' }));
      expect(reducer).toEqual(dataState);
    });

    it('with error in state', () => {
      const reducer = mapEvents(errorState, locationChangeAction({ ...mockLocationChangePayload, action: 'POP' }));
      expect(reducer).toEqual(initialState);
    });
  });
});
