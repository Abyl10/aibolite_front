import { ACCESS_TOKEN, REFRESH_TOKEN } from '../consts/enums';

export const setTokens = (accessToken: string, refreshToken: string) => {
  accessToken && localStorage.setItem(ACCESS_TOKEN, accessToken);
  refreshToken && localStorage.setItem(REFRESH_TOKEN, refreshToken);
};

export const removeTokens = () => {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
};

export const getAccessToken = (): string => {
  return localStorage.getItem(ACCESS_TOKEN) || '';
};

export const getRefreshToken = (): string => {
  return localStorage.getItem(REFRESH_TOKEN) || '';
};
