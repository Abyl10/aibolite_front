import { api } from './api';

const baseURL = '/user';

export const getUserProfile = (): Promise<any> =>
  api.get(`${baseURL}/profile`).then((res) => res.data.data);

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
