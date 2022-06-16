import axios from 'axios';
import { TOKEN_ACTIONS } from '../constants';
import { Event } from '../types/events';
import {
  ClientData,
  ClientEvents,
  ClientSearchData, ClientsFormValues, EditClientData, UserData, UserDataPayloadSuccess,
} from '../types/user';

export const fetchClients = async (data: ClientSearchData): Promise<UserDataPayloadSuccess> => {
  const result = await axios({
    method: 'GET',
    url: `${process.env.API_URL}/get-all-users`,
    params: {
      title: data.title,
      isBlocked: data.blocked,
      role: data.role,
      page: data.page,
      action: TOKEN_ACTIONS.login,
    },
    withCredentials: true,
  });
  return result.data;
};

export const fetchClient = async (clientId: string): Promise<UserData> => {
  const result = await axios({
    method: 'GET',
    url: `${process.env.API_URL}/get-user-info`,
    params: {
      action: TOKEN_ACTIONS.login,
      id: clientId,
    },
    withCredentials: true,
  });
  return result.data;
};

export const fetchClientEvents = async (data: ClientEvents): Promise<Event[]> => {
  const result = await axios({
    method: 'GET',
    url: `${process.env.API_URL}/get-client-events`,
    params: {
      action: TOKEN_ACTIONS.login,
      eventsType: data.eventsType,
      id: data.id,
    },
    withCredentials: true,
  });
  return result.data;
};

export const editClientData = async (data: EditClientData): Promise<ClientData> => {
  const fetched = await axios({
    method: 'POST',
    url: `${process.env.API_URL}/edit-user-info`,
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      description: data.description,
      role: data.role,
      clientId: data.clientId,
    },
    params: {
      action: TOKEN_ACTIONS.login,
    },
    withCredentials: true,
  });
  return fetched.data;
};

export const blockClient = async (clientId: string): Promise<string> => {
  const fetched = await axios({
    method: 'POST',
    url: `${process.env.API_URL}/block-user`,
    params: {
      action: TOKEN_ACTIONS.login,
      user_id: clientId,
    },
    withCredentials: true,
  });
  return fetched.data.message;
};

export const importClients = async (data: ClientsFormValues): Promise<string> => {
  const result = await axios({
    method: 'POST',
    url: `${process.env.API_URL}/import-clients`,
    data,
    params: {
      action: TOKEN_ACTIONS.login,
    },
    withCredentials: true,
  });
  return result.data.message;
};
