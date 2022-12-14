import React, { useEffect } from 'react';
import { useUserContext } from '../contexts/UserContext';
import { Role } from '../ts/types';
import { useNavigate } from 'react-router-dom';
import { getRefreshToken } from '../utils/token';

export const Redirect: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useUserContext();

  const refreshToken = getRefreshToken();

  useEffect(() => {
    if (refreshToken) {
      if (user.role === Role.ADMIN) {
        navigate('/admin');
      } else if (user.role === Role.DOCTOR) {
        navigate('/doctor');
      } else if (user.role === Role.PATIENT) {
        navigate('/patients');
      }
    } else {
      navigate('/auth');
    }
    navigate('/patients');
  }, [refreshToken]);

  return <></>;
};
