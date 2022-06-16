import calendarEvent, { initialState } from '../calendarEvent';
import addEventInCalendar, { addEventInCalendarSuccess, addEventInCalendarError } from '../../actions/addEventInCalendar/addEventInCalendar';
import {
  mockError, mockEventId, mockEventsCategory, mockLocationChangePayload,
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
  data: mockEventsCategory,
};

describe('User reducer', () => {
  describe('loading should be true', () => {
    it('dispatch LOAD_EVENTS_DATA action', () => {
      const reducer = calendarEvent(loadingState, addEventInCalendar(
        mockEventId,
        mockEventsCategory,
      ));
      expect(reducer).toEqual({
        ...initialState,
        loading: true,
      });
    });
  });

  describe('error should be', () => {
    it('dispatch LOAD_EVENTS_DATA_FAILED action', () => {
      const reducer = calendarEvent(errorState, addEventInCalendarError(mockError));
      expect(reducer).toEqual({
        ...initialState,
        error: mockError,
      });
    });
  });

  describe('data should be', () => {
    it('dispatch LOAD_EVENTS_DATA_SUCCESS action', () => {
      const reducer = calendarEvent(
        dataState,
        addEventInCalendarSuccess(mockEventsCategory),
      );
      expect(reducer).toEqual({
        ...initialState,
        data: mockEventsCategory,
      });
    });
  });

  describe('dispatch LOCATION_CHANGE action', () => {
    it('without error in state', () => {
      const reducer = calendarEvent(dataState, locationChangeAction({ ...mockLocationChangePayload, action: 'POP' }));
      expect(reducer).toEqual(dataState);
    });

    it('with error in state', () => {
      const reducer = calendarEvent(errorState, locationChangeAction({ ...mockLocationChangePayload, action: 'POP' }));
      expect(reducer).toEqual(initialState);
    });
  });
});
