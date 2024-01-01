import React from 'react';
import { RecoilRoot, useRecoilState } from 'recoil';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import WelcomePage from '../pages/auth/Welcome.Page';
import LoginPage from '../pages/auth/Login.Page';
import RegistrationPage from '../pages/auth/Registration.Page';
import { useAuth } from '../atoms/Route.Atom';
import HomePage from '../pages/home/Home.Page';
import ProfilePage from '../pages/profile/Profile.Page';
import ProfileSettingsPage from '../pages/profile/ProfileSettings.Page';
import AccountSettings from '../pages/profile/Account.Settings.Page';
import PersonalDataSettings from '../pages/profile/PrsonalData.Settings.Page';
import OffersPage from '../pages/offers/Offers.Page';
import OfferFiltersPage from '../pages/offers/OfferFilters.Page';
import AddOfferPage from '../pages/offers/AddOffer.Page';
import { offerId } from '../atoms/SelectedOfferId.Atom';
import OfferDetailsPage from '../pages/offers/OfferDetails.Page';
// import CompleteDataPage from '../pages/auth/CompleteData.page';

const AppRouter = () => {
  const { session } = useAuth();
  const [selectedOfferId] = useRecoilState(offerId);
  
  return (
    <RecoilRoot>
      <Router>
        <Routes>
          {session ? (
            <>
            <Route path='/' element={<HomePage />} />
            <Route path='/profile' element={<ProfilePage />} />
            <Route path='/profile-settings-page' element={<ProfileSettingsPage />} />
            <Route path='/account-settings' element={<AccountSettings />} />
            <Route path='/personal-data' element={<PersonalDataSettings />} />
            <Route path='/offers' element={<OffersPage />} />
            <Route path='/offers-filter' element={<OfferFiltersPage />} />
            <Route path='/add-offer' element={<AddOfferPage />} />
            <Route path='/offerDetail/:selectedOfferId' element={<OfferDetailsPage />} />
            </>
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
