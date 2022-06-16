import { runSaga } from 'redux-saga';

import * as api from '../../../api/events.api';
import {
  mockError,
  mockEventsSearchTitle,
  mockEventsData,
  mockCategorizedEventsData,
  mockEventsCategoriesData,
  mockEventsCategory,
  mockMapData,
  mockEventsTypeData,
  mockEventsType,
  mockPage,
  mockSearchedEventsData,
} from '../../../mocks/store/constants';
import { Event } from '../../../types/events';
import { loadEventsDataSuccess, loadEventsDataFailed } from '../../actions/loadEventsData/loadEventsData';
import loadEventsCategoryData, { loadEventsCategoryDataSuccess, loadEventsCategoryDataFailed } from '../../actions/loadEventsData/loadCategorizedEventsData';
import loadSearchedEventsData, { loadSearchedEventsDataSuccess, loadSearchedEventsDataFailed } from '../../actions/loadEventsData/loadSearchedEvents';
import {
  fetchEvents, fetchEventsCategory, fetchMapEvents, fetchProfileEvents, fetchSearchedEvents,
} from '../eventsWorker';
import loadMapEventsData, { loadMapEventsDataFailed, loadMapEventsDataSuccess } from '../../actions/loadEventsData/loadMapEventsData';
import loadProfileEventsData, { loadProfileEventsDataFailed, loadProfileEventsDataSuccess } from '../../actions/loadEventsData/loadProfileEvents';

describe('Events saga', () => {
  let fetchEventsData: jest.SpyInstance;

  afterEach(() => {
    fetchEventsData.mockClear();
  });

  describe('should put events in store', () => {
    it('events categories', async () => {
      fetchEventsData = jest.spyOn(api, 'loadEvents')
        .mockImplementation(() => Promise.resolve(mockEventsCategoriesData));

      const dispatched: Event[] = [];

      await runSaga({
        dispatch: (action: Event) => dispatched.push(action),
      }, fetchEvents).toPromise();

      expect(fetchEventsData).toHaveBeenCalledTimes(1);
      expect(dispatched[0]).toEqual(loadEventsDataSuccess(mockEventsCategoriesData));
    });

    it('category of events', async () => {
      fetchEventsData = jest.spyOn(api, 'loadEventsCategory')
        .mockImplementation(() => Promise.resolve(mockCategorizedEventsData));

      const dispatched: Event[] = [];

      await runSaga({
        dispatch: (action: Event) => dispatched.push(action),
      }, fetchEventsCategory, loadEventsCategoryData(mockEventsCategory, mockPage)).toPromise();

      expect(fetchEventsData).toHaveBeenCalledTimes(1);
      expect(dispatched[0]).toEqual(loadEventsCategoryDataSuccess(mockEventsData, mockPage));
    });

    it('searched events', async () => {
      fetchEventsData = jest.spyOn(api, 'loadSearchedEvents')
        .mockImplementation(() => Promise.resolve(mockSearchedEventsData));

      const dispatched: Event[] = [];

      await runSaga({
        dispatch: (action: Event) => dispatched.push(action),
      }, fetchSearchedEvents, loadSearchedEventsData(mockEventsSearchTitle, mockPage)).toPromise();

      expect(fetchEventsData).toHaveBeenCalledTimes(1);
      expect(dispatched[0]).toEqual(loadSearchedEventsDataSuccess(mockEventsData, mockPage));
    });

    it('map events', async () => {
      fetchEventsData = jest.spyOn(api, 'loadMapEvents')
        .mockImplementation(() => Promise.resolve(mockEventsData));

      const dispatched: Event[] = [];

      await runSaga({
        dispatch: (action: Event) => dispatched.push(action),
      }, fetchMapEvents, loadMapEventsData(mockMapData.radius, mockMapData.position)).toPromise();

      expect(fetchEventsData).toHaveBeenCalledTimes(1);
      expect(dispatched[0]).toEqual(loadMapEventsDataSuccess(mockEventsData));
    });

    it('profile events', async () => {
      fetchEventsData = jest.spyOn(api, 'loadProfileEvents')
        .mockImplementation(() => Promise.resolve(mockEventsTypeData));

      const dispatched: Event[] = [];

      await runSaga({
        dispatch: (action: Event) => dispatched.push(action),
      }, fetchProfileEvents, loadProfileEventsData(mockEventsType)).toPromise();

      expect(fetchEventsData).toHaveBeenCalledTimes(1);
      expect(dispatched[0]).toEqual(loadProfileEventsDataSuccess(mockEventsTypeData));
    });
  });

  describe('should throw an error in catch block', () => {
    it('events categories', async () => {
      fetchEventsData = jest.spyOn(api, 'loadEvents')
        .mockImplementation(() => Promise.reject(mockError));

      const dispatched: Event[] = [];

      await runSaga({
        dispatch: (action: Event) => dispatched.push(action),
      }, fetchEvents).toPromise();

      expect(fetchEventsData).toHaveBeenCalledTimes(1);
      expect(dispatched[0]).toEqual(loadEventsDataFailed(mockError));
    });

    it('category of events', async () => {
      fetchEventsData = jest.spyOn(api, 'loadEventsCategory')
        .mockImplementation(() => Promise.reject(mockError));

      const dispatched: Event[] = [];

      await runSaga({
        dispatch: (action: Event) => dispatched.push(action),
      }, fetchEventsCategory, loadEventsCategoryData(mockEventsCategory, mockPage)).toPromise();

      expect(fetchEventsData).toHaveBeenCalledTimes(1);
      expect(dispatched[0]).toEqual(loadEventsCategoryDataFailed(mockError));
    });

    it('searched events', async () => {
      fetchEventsData = jest.spyOn(api, 'loadSearchedEvents')
        .mockImplementation(() => Promise.reject(mockError));

      const dispatched: Event[] = [];

      await runSaga({
        dispatch: (action: Event) => dispatched.push(action),
      }, fetchSearchedEvents, loadSearchedEventsData(mockEventsSearchTitle, mockPage)).toPromise();

      expect(fetchEventsData).toHaveBeenCalledTimes(1);
      expect(dispatched[0]).toEqual(loadSearchedEventsDataFailed(mockError));
    });

    it('map events', async () => {
      fetchEventsData = jest.spyOn(api, 'loadMapEvents')
        .mockImplementation(() => Promise.reject(mockError));

      const dispatched: Event[] = [];

      await runSaga({
        dispatch: (action: Event) => dispatched.push(action),
      }, fetchMapEvents, loadMapEventsData(mockMapData.radius, mockMapData.position)).toPromise();

      expect(fetchEventsData).toHaveBeenCalledTimes(1);
      expect(dispatched[0]).toEqual(loadMapEventsDataFailed(mockError));
    });

    it('profile events', async () => {
      fetchEventsData = jest.spyOn(api, 'loadProfileEvents')
        .mockImplementation(() => Promise.reject(mockError));

      const dispatched: Event[] = [];

      await runSaga({
        dispatch: (action: Event) => dispatched.push(action),
      }, fetchProfileEvents, loadProfileEventsData(mockEventsType)).toPromise();

      expect(fetchEventsData).toHaveBeenCalledTimes(1);
      expect(dispatched[0]).toEqual(loadProfileEventsDataFailed(mockError));
    });
  });
});
