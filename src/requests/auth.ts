import axios from 'axios';

type TokenResponseType = {
  access: string;
  refresh: string;
};

const baseURL = '/api/v2/client';

export const login = (phone: string, password: string): Promise<TokenResponseType> =>
  axios.post(`${baseURL}/token`, { phone, password }).then((res) => res.data);

export const getToken = (refreshToken: string): Promise<TokenResponseType> =>
  axios.post(`${baseURL}/token/refresh`, { refreshToken }).then((res) => res.data);
