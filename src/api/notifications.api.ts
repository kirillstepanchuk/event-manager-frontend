import axios from 'axios';
import { TOKEN_ACTIONS } from '../constants';
import { CategoriesData, PhoneData } from '../types/formData';

export const subscribeToNotifications = async (data: PhoneData): Promise<string> => {
  const result = await axios({
    url: `${process.env.API_URL}/send-message`,
    method: 'POST',
    data: {
      phoneNumber: data.phone,
    },
    withCredentials: true,
  });
  return result.data.message;
};

export const subscribeToNewsletters = async (data: CategoriesData): Promise<string> => {
  const result = await axios({
    url: `${process.env.API_URL}/set-interested-categories`,
    method: 'POST',
    data: {
      data: data.categories,
    },
    params: {
      action: TOKEN_ACTIONS.login,
    },
    withCredentials: true,
  });
  return result.data.message;
};
