import axios from 'axios';
import { EmailData, PasswordData } from '../types/formData';

export const sendEmail = async (data: EmailData): Promise<string> => {
  const result = await axios({
    url: `${process.env.API_URL}/forgot-password`,
    method: 'POST',
    data: {
      email: data.email,
    },
    withCredentials: true,
  });
  return result.data.message;
};

export const resetPassword = async (data: PasswordData): Promise<string> => {
  const result = await axios({
    url: `${process.env.API_URL}/reset-password`,
    method: 'POST',
    data: {
      newPassword: data.password,
      id: data.userId,
    },
    withCredentials: true,
  });
  return result.data.message;
};
