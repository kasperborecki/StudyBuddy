import React from 'react';
import { RecoilRoot } from 'recoil';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import WelcomePage from '../pages/authorization/Welcome.Page';
import LoginPage from '../pages/authorization/Login.Page';
import RegistrationPage from '../pages/authorization/Registration.Page';
import { useAuth } from '../atoms/Route.Atom';
import HomePage from '../pages/home/Home.Page';

const AppRouter = () => {
  const { session } = useAuth();
  console.log(session);
  
  return (
    <RecoilRoot>
      <Router>
        <Routes>
          {session ? (
            <Route path='/' element={<HomePage />} />
            ) : (
              <>
              <Route path='/' element={<WelcomePage />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/registration' element={<RegistrationPage />} />
            </>
          )}
        </Routes>
      </Router>
    </RecoilRoot>
  );
};

export default AppRouter;
