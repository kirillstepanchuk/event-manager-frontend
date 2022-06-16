import axios, { AxiosResponse } from 'axios';
import { UserData, EditUserData, UserCategorie } from '../types/user';
import { TOKEN_ACTIONS } from '../constants';
import { ChangePasswordData } from '../types/formData';

export const fetchCurrentUser = async ():Promise<UserData> => {
  const fetched = await axios({
    method: 'GET',
    url: `${process.env.API_URL}/get-user`,
    params: {
      action: TOKEN_ACTIONS.login,
    },
    withCredentials: true,
  });
  return fetched.data;
};

export const fetchEditUser = async (data: EditUserData):Promise<UserData> => {
  const fetched = await axios({
    method: 'POST',
    url: `${process.env.API_URL}/edit-user`,
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      description: data.description,
    },
    params: {
      action: TOKEN_ACTIONS.login,
    },
    withCredentials: true,
  });
  return fetched.data;
};

export const fetchChangePassword = async (data: ChangePasswordData):Promise<AxiosResponse> => {
  const fetched = await axios({
    method: 'POST',
    url: `${process.env.API_URL}/change-password`,
    data: {
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
      repeatedNewPassword: data.repeatedNewPassword,
    },
    params: {
      action: TOKEN_ACTIONS.login,
    },
    withCredentials: true,
  });
  return fetched;
};

export const fetchUserCategories = async (userId: string): Promise<UserCategorie[]> => {
  const fetched = await axios({
    method: 'GET',
    url: `${process.env.API_URL}/get-interested-categories`,
    params: {
      action: TOKEN_ACTIONS.login,
      user_id: userId,
    },
    withCredentials: true,
  });
  return fetched.data;
};
