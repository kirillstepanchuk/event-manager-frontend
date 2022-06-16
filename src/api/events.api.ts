import axios from 'axios';
import {
  Event,
  EventCategory,
  EventCategoryData,
  EventCategorySuccessData,
  EventSearchData,
  EventSearchSuccessData,
  EventsType, MapEvent, Position, NewEventData,
} from '../types/events';
import { COOKIES, TOKEN_ACTIONS } from '../constants';
import { getCookie } from '../utils/cookiesUtils';

export const loadEvents = async (): Promise<EventCategory[] | string> => {
  const result = await axios({
    url: `${process.env.API_URL}/get-events`,
    method: 'GET',
    withCredentials: true,
  });
  return result.data;
};

export const loadEventsCategory = async (
  data: EventCategoryData,
): Promise<EventCategorySuccessData | string> => {
  const result = await axios({
    url: `${process.env.API_URL}/get-events-category`,
    method: 'GET',
    params: {
      category: data.category,
      page: data.page,
    },
    withCredentials: true,
  });
  return result.data;
};

export const loadSearchedEvents = async (
  data: EventSearchData,
): Promise<EventSearchSuccessData | string> => {
  const result = await axios({
    url: `${process.env.API_URL}/get-searched-events`,
    method: 'GET',
    params: {
      title: data.title,
      page: data.page,
    },
    withCredentials: true,
  });
  return result.data;
};

export const loadMapEvents = async (
  radius: number,
  position: Position,
): Promise<MapEvent[] | string> => {
  const result = await axios({
    url: `${process.env.API_URL}/get-map-events`,
    method: 'GET',
    params: {
      radius,
      lng: position.lng,
      lat: position.lat,
    },
    withCredentials: true,
  });
  return result.data;
};

export const addEvent = async (data: NewEventData): Promise<string> => {
  const result = await axios({
    url: `${process.env.API_URL}/add-event`,
    method: 'POST',
    data: {
      data,
    },
    params: {
      action: TOKEN_ACTIONS.login,
    },
    withCredentials: true,
  });
  return result.data.message;
};

export const loadProfileEvents = async (eventsType: string): Promise<EventsType> => {
  const result = await axios({
    url: `${process.env.API_URL}/get-profile-events`,
    method: 'GET',
    params: {
      action: TOKEN_ACTIONS.login,
      eventsType,
    },
    withCredentials: true,
  });
  return result.data;
};

export const editEvent = async (data: NewEventData, id: string): Promise<string> => {
  const result = await axios({
    url: `${process.env.API_URL}/edit-event`,
    method: 'POST',
    data: {
      data,
    },
    params: {
      action: TOKEN_ACTIONS.login,
      id,
    },
    withCredentials: true,
  });
  return result.data.message;
};

export const loadUnnaprovedEvents = async (): Promise<Event[]> => {
  const result = await axios({
    url: `${process.env.API_URL}/get-unapproved-events`,
    method: 'GET',
    params: {
      action: TOKEN_ACTIONS.login,
    },
    withCredentials: true,
  });
  return result.data;
};
