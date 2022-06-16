import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { waitFor } from '@testing-library/react';

import { loadEvent, createEventInCalendar } from '../event.api';
import {
  mockAxiosEvent, mockEventCode, mockEventId, mockSuccess,
} from '../../mocks/store/constants';

describe('event api', () => {
  const mock = new MockAdapter(axios);

  afterEach(() => {
    mock.reset();
  });

  describe('load event call', () => {
    it('should return event', async () => {
      mock.onGet(`${process.env.API_URL}/get-event`).reply(200, mockAxiosEvent);

      const result = await loadEvent(mockEventId);

      await waitFor(() => {
        expect(mock.history.get[0].url).toEqual(`${process.env.API_URL}/get-event`);
        expect(result).toEqual(mockAxiosEvent);
      });
    });
  });

  describe('add event in calendar call', () => {
    it('should return success message', async () => {
      mock.onPost(`${process.env.API_URL}/create-event-in-cal`).reply(200, mockSuccess);

      const result = await createEventInCalendar(mockEventId, mockEventCode);

      await waitFor(() => {
        expect(mock.history.post[0].url).toEqual(`${process.env.API_URL}/create-event-in-cal`);
        expect(result).toEqual(mockSuccess);
      });
    });
  });
});
