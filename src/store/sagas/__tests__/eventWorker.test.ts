import { runSaga } from 'redux-saga';

import * as api from '../../../api/event.api';
import {
  mockError,
  mockEventId,
  mockEvent,
  mockSuccess,
  mockEventCode,
} from '../../../mocks/store/constants';
import { fetchEvent, addEventToCalendar } from '../eventWorker';
import addEventInCalendar, { addEventInCalendarSuccess, AddEventInCalendarActions, addEventInCalendarError } from '../../actions/addEventInCalendar/addEventInCalendar';
import loadEventData, { LoadEventActions, loadEventDataFailed, loadEventDataSuccess } from '../../actions/loadEventData/loadEventData';

describe('event saga', () => {
  let loadEvent: jest.SpyInstance;

  afterEach(() => {
    loadEvent.mockClear();
  });

  describe('should put event data in store', () => {
    it('fetch event', async () => {
      loadEvent = jest.spyOn(api, 'loadEvent')
        .mockImplementation(() => Promise.resolve(mockEvent));

      const dispatched: LoadEventActions[] = [];

      await runSaga({
        dispatch: (action: LoadEventActions) => dispatched.push(action),
      }, fetchEvent, loadEventData(mockEventId)).toPromise();

      expect(loadEvent).toHaveBeenCalledTimes(1);
      expect(dispatched[0]).toEqual(loadEventDataSuccess(mockEvent));
    });

    it('add event in calendar', async () => {
      loadEvent = jest.spyOn(api, 'createEventInCalendar')
        .mockImplementation(() => Promise.resolve(mockSuccess));

      const dispatched: AddEventInCalendarActions[] = [];

      await runSaga({
        dispatch: (action: AddEventInCalendarActions) => dispatched.push(action),
      }, addEventToCalendar, addEventInCalendar(mockEventId, mockEventCode)).toPromise();

      expect(loadEvent).toHaveBeenCalledTimes(1);
      expect(dispatched[0]).toEqual(addEventInCalendarSuccess(mockSuccess));
    });
  });

  describe('should put error in catch block', () => {
    it('fetch event', async () => {
      loadEvent = jest.spyOn(api, 'loadEvent')
        .mockImplementation(() => Promise.reject(mockError));

      const dispatched: LoadEventActions[] = [];

      await runSaga({
        dispatch: (action: LoadEventActions) => dispatched.push(action),
      }, fetchEvent, loadEventData(mockEventId)).toPromise();

      expect(loadEvent).toHaveBeenCalledTimes(1);
      expect(dispatched[0]).toEqual(loadEventDataFailed(mockError));
    });

    it('add event in calendar', async () => {
      loadEvent = jest.spyOn(api, 'createEventInCalendar')
        .mockImplementation(() => Promise.reject(mockError));

      const dispatched: AddEventInCalendarActions[] = [];

      await runSaga({
        dispatch: (action: AddEventInCalendarActions) => dispatched.push(action),
      }, addEventToCalendar, addEventInCalendar(mockEventId, mockEventCode)).toPromise();

      expect(loadEvent).toHaveBeenCalledTimes(1);
      expect(dispatched[0]).toEqual(addEventInCalendarError(mockError));
    });
  });
});
