import axios from 'axios';
import { TOKEN_ACTIONS } from '../constants';
import { AdvertisementData, PaymentSessionData } from '../types/events';
import { TicketsData } from '../types/formData';

export const bookTickets = async (ticketsData: TicketsData): Promise<PaymentSessionData> => {
  const result = await axios({
    url: `${process.env.API_URL}/book-user-event`,
    method: 'POST',
    data: ticketsData,
    params: {
      action: TOKEN_ACTIONS.login,
    },
    withCredentials: true,
  });
  return result.data;
};

export const confirmBooking = async (eventId: string): Promise<string> => {
  const result = await axios({
    url: `${process.env.API_URL}/confirm-booked-user-event`,
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

export const buyEventAdvertisement = async (
  advData: AdvertisementData,
): Promise<PaymentSessionData> => {
  const result = await axios({
    url: `${process.env.API_URL}/buy-event-advertisement`,
    method: 'POST',
    data: advData,
    params: {
      action: TOKEN_ACTIONS.login,
    },
    withCredentials: true,
  });
  return result.data;
};

export const eventAdvertisementConfirmation = async (
  eventId: string,
): Promise<string> => {
  const result = await axios({
    url: `${process.env.API_URL}/confirm-event-advertisement`,
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
