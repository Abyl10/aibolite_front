import axios from 'axios';

type TokenResponseType = {
  accessToken: string;
  msg: string;
  refreshToken: string;
  success: boolean;
  type: string;
  needToChangePassword: boolean;
};

const baseURL = '/api/auth';

export const login = (login: string, password: string): Promise<TokenResponseType> =>
  axios.post(`${baseURL}/login`, { login, password }).then((res) => res.data);

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
