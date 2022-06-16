import axios from 'axios';

import { TOKEN_ACTIONS } from '../constants';
import { Event } from '../types/events';

export const loadEvent = async (id: string): Promise<Event | string> => {
  const result = await axios({
    url: `${process.env.API_URL}/get-event`,
    method: 'GET',
    params: {
      event_id: id,
    },
    withCredentials: true,
  });
  return result.data;
};

export const createEventInCalendar = async (id: string, code: string): Promise<string> => {
  const result = await axios({
    url: `${process.env.API_URL}/create-event-in-cal`,
    method: 'POST',
    data: {
      id,
      code,
    },
    withCredentials: true,
  });
  return result.data;
};

export const approveEvent = async (eventId: string): Promise<string> => {
  const result = await axios({
    url: `${process.env.API_URL}/approve-event`,
    method: 'POST',
    data: {
      event_id: eventId,
    },
    params: {
      action: TOKEN_ACTIONS.login,
    },
    withCredentials: true,
  });
  return result.data.message;
};

export const deleteEvent = async (eventId: string): Promise<string> => {
  const result = await axios({
    url: `${process.env.API_URL}/delete-event`,
    method: 'DELETE',
    data: {
      event_id: eventId,
    },
    params: {
      action: TOKEN_ACTIONS.login,
    },
    withCredentials: true,
  });
  return result.data.message;
};
