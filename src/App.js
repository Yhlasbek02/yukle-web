import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUpEmail from './components/sign-up-email/SignUpEmail';
import ForgotEmail from './components/forgot-email/ForgotEmail';
import ForgotMobile from './components/forgot-mobile/ForgotMobile';
import NewPassword from './components/new-password/NewPassword';
import PageNotFound from './components/pageNotFound/PageNotFound';
import SignUpMobile from './components/sign-up-mobile/SignUpMobile';
import LoginEmail from './components/login-email/LoginEmail';
import LoginMobile from './components/login-mobile/LoginMobile';
import Verification from './components/verification/Verification';
import Main from './components/main/Main';
import MyCargo from './components/my-cargo/MyCargo';
import MyTransport from './components/my-transport/MyTransport';
import Profile from './components/profile/Profile';
import Notifications from './components/notifications/Notifications';
import VerificationForgot from './components/verification/newPassVerification';

const App = ({ internetConnection }) => {
  if (!internetConnection) {
    return <div>No internet connection.</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUpEmail />} />
        <Route path="/:lang" element={<SignUpEmail />} />
        <Route path="/signup-mobile/:lang" element={<SignUpMobile />} />
        <Route path="/login-email/:lang" element={<LoginEmail />} />
        <Route path="/login-mobile/:lang" element={<LoginMobile />} />
        <Route path="/forgot-email/:lang" element={<ForgotEmail />} />
        <Route path="/forgot-mobile/:lang" element={<ForgotMobile />} />
        <Route path="/verify/:lang" element={<Verification />} />
        <Route path="/verify-forgot/:lang" element={<VerificationForgot />} />
        <Route path="/new-password/:lang" element={<NewPassword />} />
        <Route path="/main/:lang" element={<Main />} />
        <Route path="/my-cargo/:lang" element={<MyCargo />} />
        <Route path="/my-transport/:lang" element={<MyTransport />} />
        <Route path="/profile/:lang" element={<Profile />} />
        <Route path="/notifications/:lang" element={<Notifications />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
