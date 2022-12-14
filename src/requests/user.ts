import { api } from './api';
import { IUser } from '../ts/types';

const baseURL = '/v2/client';

export const getUserProfile = (): Promise<IUser> =>
  api.get(`${baseURL}/profile`).then((res) => res.data);

export type ResetPasswordResponse = {
  success: boolean;
  msg: string;
  errors: string[] | null;
};

export const resetPassword = (
  currentPassword: string,
  newPassword: string
): Promise<ResetPasswordResponse> => {
  return api
    .post(`${baseURL}/resetPassword`, { currentPassword, newPassword })
    .then((res) => res.data)
    .catch((res) => res.response.data);
};
