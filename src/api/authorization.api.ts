import axios from 'axios';
import { SignupData, UserData, LoginData } from '../types/user';
import { TOKEN_ACTIONS } from '../constants';

export const fetchAuthorization = async (data: LoginData):Promise<UserData> => {
  const fetched = await axios({
    method: 'POST',
    url: `${process.env.API_URL}/login`,
    data: {
      email: data.email,
      password: data.password,
    },
    withCredentials: true,
  });
  return fetched.data;
};

export const fetchRegistration = async (data: SignupData):Promise<UserData> => {
  const fetched = await axios({
    method: 'POST',
    url: `${process.env.API_URL}/register`,
    data: {
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
    },
    withCredentials: true,
  });
  return fetched.data;
};

export const fetchUserConfirmation = async (token: string): Promise<UserData> => {
  const fetched = await axios({
    method: 'POST',
    url: `${process.env.API_URL}/confirm-account`,
    params: {
      action: TOKEN_ACTIONS.register,
      token,
    },
    withCredentials: true,
  });
  return fetched.data;
};
