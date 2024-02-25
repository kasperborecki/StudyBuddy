import React from "react";
import { RecoilRoot } from "recoil";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

import LoginPage from "../pages/auth/Login.Page";
import RegistrationPage from "../pages/auth/Registration.Page";
import { useAuth } from "../atoms/Route.Atom";
import HomePage from "../pages/home/Home.Page";
import ProfilePage from "../pages/profile/Profile.Page";
import AccountSettings from "../pages/profile/Account.Settings.Page";
import PersonalDataSettings from "../pages/profile/PrsonalData.Settings.Page";
import OffersPage from "../pages/offers/Offers.Page";
import OfferFiltersPage from "../pages/offers/OfferFilters.Page";
import AddOfferPage from "../pages/offers/AddOffer.Page";
import OfferDetailsPage from "../pages/offers/OfferDetails.Page";
import BottomBar from "../components/bottomBar/BottomBar";
import ContactsPage from "../pages/chats/Contacts.Page";
import ChatPage from "../pages/chats/Chat.page";
import ChatSettings from "../pages/chats/Chat.Setting";
import ForumPage from "../pages/forum/Forum.Page";

const AppRouter = () => {
  const { session } = useAuth();

  return (
    <>
      <RecoilRoot>
        <Router>
          {session && (
            <div className="fixed bottom-0 left-0 w-full bg-white z-20">
              <BottomBar />
            </div>
          )}
          <Routes>
            {session ? (
              <>
                <Route path="/" element={<HomePage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/account-settings" element={<AccountSettings />} />
                <Route
                  path="/personal-data"
                  element={<PersonalDataSettings />}
                />
                <Route path="/offers" element={<OffersPage />} />
                <Route path="/offers-filter" element={<OfferFiltersPage />} />
                <Route path="/add-offer" element={<AddOfferPage />} />
                <Route
                  path="/offerDetail/:selectedOfferId"
                  element={<OfferDetailsPage />}
                />
                <Route path="/contacts" element={<ContactsPage />} />
                <Route path="/chat/:chatId" element={<ChatPage />} />
                <Route path="/chat-settings" element={<ChatSettings />} />
                <Route path="/forum" element={<ForumPage />} />
              </>
            ) : (
              <>
                <Route path="/" element={<LoginPage />} />
                <Route path="/registration" element={<RegistrationPage />} />
              </>
            )}
          </Routes>
        </Router>
      </RecoilRoot>
    </>
  );
};

export default AppRouter;
