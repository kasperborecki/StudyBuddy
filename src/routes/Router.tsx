import React from 'react';
import { RecoilRoot } from 'recoil';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import WelcomePage from '../pages/auth/Welcome.Page';
import LoginPage from '../pages/auth/Login.Page';
import RegistrationPage from '../pages/auth/Registration.Page';
import { useAuth } from '../atoms/Route.Atom';
import HomePage from '../pages/home/Home.Page';
// import CompleteDataPage from '../pages/auth/CompleteData.page';

const AppRouter = () => {
  const { session } = useAuth();
  
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
              {/* <Route path='Complete-Data' element={<CompleteDataPage />} /> */}
            </>
          )}
        </Routes>
      </Router>
    </RecoilRoot>
  );
};

export default AppRouter;
