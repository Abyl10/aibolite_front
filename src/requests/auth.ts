import axios from 'axios';
import { api } from './api';

type TokenResponseType = {
  access: string;
  refresh: string;
};

const baseURL = 'http://127.0.0.1:8000/api/v1';

export const login = (username: string, password: string): Promise<TokenResponseType> =>
  api.post(`${baseURL}/token`, { username, password }).then((res) => res.data);

export const getToken = (refreshToken: string): Promise<TokenResponseType> =>
  axios.post(`${baseURL}/token`, { refreshToken }).then((res) => res.data);

type ForgotPasswordResponseType = {
  data: boolean;
  success: boolean;
};

export const forgotPassword = (login: string): Promise<ForgotPasswordResponseType> =>
  axios.post(`${baseURL}/forgotPassword`, { login }).then((res) => res.data);

export type ChangePasswordResponse = {
  success: boolean;
  msg: string | null;
  errors: string[] | null;
  type: string;
  accessToken: string;
  refreshToken: string;
  needToChangePassword: boolean;
};

export const changePassword = (
  login: string,
  newPassword: string,
  tempPassword: string
): Promise<ChangePasswordResponse> => {
  return axios
    .post(`${baseURL}/changePasswordByTemp`, {
      login,
      newPassword,
      tempPassword,
    })
    .then((res) => res.data)
    .catch((res) => res.response.data);
};
