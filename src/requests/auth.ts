import axios from 'axios';
import { api } from './api';

type TokenResponseType = {
  access: string;
  refresh: string;
};

const baseURL = 'http://127.0.0.1:8000/api/v2/client';

export const login = (phone: string, password: string): Promise<TokenResponseType> =>
  api.post(`${baseURL}/token`, { phone, password }).then((res) => res.data);

export const getToken = (refreshToken: string): Promise<TokenResponseType> =>
  axios.post(`${baseURL}/token/refresh`, { refreshToken }).then((res) => res.data);
