import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../../context/globalContext';
import { useNavigate } from 'react-router-dom';
import { AuthStyle, Right, Left } from '../../styles/authSidebar';
import { Link } from 'react-router-dom';
import AuthSidebar from '../authSidebar/authSidebar';
import { Card, Container, Mobile, RegisterLink } from '../../styles/authCard';
import MobileForm from '../loginForm/mobileForm';
import LanguageSelectForAuth from '../../utils/languageForAuth';

const getLanguageFromPath = () => {
  const pathname = window.location.pathname;
  const parts = pathname.split('/');
  const lastPart = parts[parts.length - 1];
  if (['en', 'ru', 'tr'].includes(lastPart)) {
    return lastPart;
  } else {
    return 'en';
  }
};

function LoginMobile() {
  const { loginByMobile } = useGlobalContext();
  const [selectedLanguage, setSelectedLanguage] = useState(getLanguageFromPath());
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const history = useNavigate();
  useEffect(() => {
    setSelectedLanguage(getLanguageFromPath());
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const isSuccess = await loginByMobile(phoneNumber, password, selectedLanguage);
      if (isSuccess) {
        setEmail('');
        setPassword('');
        console.log('Login successful');
        history(`/main/${selectedLanguage}`);
      }
    } catch (error) {
      console.log(error)
      console.error(error.response?.data?.message || 'Sign up failed');
    }
  };

  return (
    <AuthStyle>
      <Right>
        <AuthSidebar />
      </Right>
      <Left>
        <Card>
          <LanguageSelectForAuth selectedLanguage={selectedLanguage} setSelectedLanguage={setSelectedLanguage} />
          <Container>
            <MobileForm
              submit={handleSubmit}
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
              password={password}
              setPassword={setPassword}
              language={selectedLanguage}
            />
          </Container>
        </Card>
      </Left>
    </AuthStyle>
  );
}

export default LoginMobile;
