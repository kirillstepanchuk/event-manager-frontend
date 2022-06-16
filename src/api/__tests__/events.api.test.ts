import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { waitFor } from '@testing-library/react';

import {
  loadEvents,
  loadEventsCategory,
  loadMapEvents,
  loadProfileEvents,
  loadSearchedEvents,
  addEvent,
  editEvent,
} from '../events.api';
import {
  mockAxiosEventsCategoriesData,
  mockEventsCategoryPayload,
  mockAxiosEventsData,
  mockMapData,
  mockNewEvent,
  mockAxiosSuccessMessage, mockEventsType, mockEventId, mockSuccess, mockEventsSearchPayload,
} from '../../mocks/store/constants';

describe('events api', () => {
  const mock = new MockAdapter(axios);

  afterEach(() => {
    mock.reset();
  });

  describe('load events call', () => {
    it('should return events', async () => {
      mock.onGet(`${process.env.API_URL}/get-events`).reply(200, mockAxiosEventsCategoriesData);

      const result = await loadEvents();

      await waitFor(() => {
        expect(mock.history.get[0].url).toEqual(`${process.env.API_URL}/get-events`);
        expect(result).toEqual(mockAxiosEventsCategoriesData);
      });
    });
  });

  describe('events category call', () => {
    it('should return events category', async () => {
      mock.onGet(`${process.env.API_URL}/get-events-category`).reply(200, mockAxiosEventsData);

      const result = await loadEventsCategory(mockEventsCategoryPayload);

      await waitFor(() => {
        expect(mock.history.get[0].url).toEqual(`${process.env.API_URL}/get-events-category`);
        expect(result).toEqual(mockAxiosEventsData);
      });
    });
  });

  describe('search events call', () => {
    it('should return search results', async () => {
      mock.onGet(`${process.env.API_URL}/get-searched-events`).reply(200, mockAxiosEventsData);

      const result = await loadSearchedEvents(mockEventsSearchPayload);

      await waitFor(() => {
        expect(mock.history.get[0].url).toEqual(`${process.env.API_URL}/get-searched-events`);
        expect(result).toEqual(mockAxiosEventsData);
      });
    });
  });

  describe('map events call', () => {
    it('should return events for google map', async () => {
      mock.onGet(`${process.env.API_URL}/get-map-events`).reply(200, mockAxiosEventsData);

      const result = await loadMapEvents(mockMapData.radius, mockMapData.position);

      await waitFor(() => {
        expect(mock.history.get[0].url).toEqual(`${process.env.API_URL}/get-map-events`);
        expect(result).toEqual(mockAxiosEventsData);
      });
    });
  });

  describe('add eveent call', () => {
    it('should return success message', async () => {
      mock.onPost(`${process.env.API_URL}/add-event`).reply(200, mockAxiosSuccessMessage);

      const result = await addEvent(mockNewEvent);

      await waitFor(() => {
        expect(mock.history.post[0].url).toEqual(`${process.env.API_URL}/add-event`);
        expect(result).toEqual(mockSuccess);
      });
    });
  });

  describe('load profile events call', () => {
    it('should return profile events', async () => {
      mock.onGet(`${process.env.API_URL}/get-profile-events`).reply(200, mockAxiosEventsData);

      const result = await loadProfileEvents(mockEventsType);

      await waitFor(() => {
        expect(mock.history.get[0].url).toEqual(`${process.env.API_URL}/get-profile-events`);
        expect(result).toEqual(mockAxiosEventsData);
      });
    });
  });

  describe('edit event call', () => {
    it('should return success message', async () => {
      mock.onPost(`${process.env.API_URL}/edit-event`).reply(200, mockAxiosSuccessMessage);

      const result = await editEvent(mockNewEvent, mockEventId);

      await waitFor(() => {
        expect(mock.history.post[0].url).toEqual(`${process.env.API_URL}/edit-event`);
        expect(result).toEqual(mockSuccess);
      });
    });
  });
});
