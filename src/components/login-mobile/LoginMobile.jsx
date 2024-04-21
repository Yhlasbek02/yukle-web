import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../../context/globalContext';
import { useNavigate } from 'react-router-dom';
import { AuthStyle } from '../../styles/authSidebar';
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
  const { signUpEmail } = useGlobalContext();
  const [selectedLanguage, setSelectedLanguage] = useState(getLanguageFromPath());
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [language, setLang] = useState('en');
  const [error, setError] = useState('');
  const history = useNavigate();
  useEffect(() => {
    setSelectedLanguage(getLanguageFromPath());
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUpEmail(email, password, language);
      localStorage.setItem('email', email);
      setEmail('');
      setName('');
      setSurname('');
      setPassword('');
      console.log('Sign up successful');
      history(`/verify/${language}`);
    } catch (error) {
      alert(error);
      setError(error.response?.data?.message || 'Sign up failed');
    }
  };

  return (
    <AuthStyle>
      <div className='right'>
        <AuthSidebar />
      </div>
      <div className='left'>
        <Card>
          <LanguageSelectForAuth selectedLanguage={selectedLanguage} setSelectedLanguage={setSelectedLanguage} />
          <Container>
            <MobileForm
              submit={handleSubmit}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              language={selectedLanguage}
            />
          </Container>
        </Card>
      </div>
    </AuthStyle>
  );
}

export default LoginMobile;
