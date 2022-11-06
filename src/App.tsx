import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ROUTES } from './consts/routes';
import { Auth } from './pages/Auth';
import { Layout } from './components/layout/Layout';
import { useUserContext } from './contexts/UserContext';
import { Redirect } from './pages/Redirect';
import { Register } from './pages/Register';
import { ForgotPassword } from './pages/ForgotPassword';

export const App: React.FC = () => {
  const { user, getUser } = useUserContext();

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/" element={<Layout />}>
        {ROUTES.map(
          (route) =>
            route.roles.find((role) => role === user.role) && (
              <Route key={route.path} path={route.path} element={route.component} />
            )
        )}
        <Route path="*" element={<Redirect />} />
      </Route>
    </Routes>
  );
};
