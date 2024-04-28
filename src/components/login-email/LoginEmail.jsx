import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../../context/globalContext';
import { useNavigate } from 'react-router-dom';
import { AuthStyle } from '../../styles/authSidebar';
import { Link } from 'react-router-dom';
import AuthSidebar from '../authSidebar/authSidebar';
import { Card, Container, Mobile, RegisterLink } from '../../styles/authCard';
import EmailForm from '../loginForm/emailForm';
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

function LoginEmail() {
  const { loginByEmail } = useGlobalContext();
  const [selectedLanguage, setSelectedLanguage] = useState(getLanguageFromPath());
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useNavigate();
  useEffect(() => {
    setSelectedLanguage(getLanguageFromPath());
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(email, password);
      const isSuccess = await loginByEmail(email, password, selectedLanguage);
      console.log(isSuccess)
      if (isSuccess) {
        setEmail('');
        setPassword('');
        console.log('Login successful');
        history(`/main/${selectedLanguage}`);
      }
    } catch (error) {
      console.error(error.response?.data?.message || 'Sign up failed');
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
            <EmailForm
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

export default LoginEmail;
