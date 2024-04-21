import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../../context/globalContext';
import { useNavigate } from 'react-router-dom';
import { AuthStyle, Left, Right } from '../../styles/authSidebar';

import AuthSidebar from '../authSidebar/authSidebar';
import { Card, Container, Mobile, RegisterLink } from '../../styles/authCard';
import LanguageSelectForAuth from '../../utils/languageForAuth';
import Form from '../signUpForm/Form';

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

function SignUpForm() {
  const [selectedLanguage, setSelectedLanguage] = useState(getLanguageFromPath());
  const { signUpEmail } = useGlobalContext();
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useNavigate();
  useEffect(() => {
    setSelectedLanguage(getLanguageFromPath());
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const isSuccess = await signUpEmail(name, surname, email, password, selectedLanguage);
      if (isSuccess) {
        localStorage.setItem('email', email);
        setEmail('');
        setName('');
        setSurname('');
        setPassword('');
        console.log('Sign up successful');
        history(`/verify/${selectedLanguage}`);
      }
    } catch (error) {
      console.log(error);
      setError(error.response?.data?.message || 'Sign up failed');
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
            <Form
              submit={handleSubmit}
              name={name}
              setName={setName}
              surname={surname}
              setSurname={setSurname}
              email={email}
              setEmail={setEmail}
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

export default SignUpForm;
