import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../../context/globalContext';
import { useNavigate } from 'react-router-dom';
import { AuthStyle } from '../../styles/authSidebar';
import { Link } from 'react-router-dom';
import AuthSidebar from '../authSidebar/authSidebar';
import { Card, Container, Mobile, RegisterLink } from '../../styles/authCard';
import MobileForm from '../signUpForm/mobileForm';
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
function SignUpMobile() {
  const [selectedLanguage, setSelectedLanguage] = useState(getLanguageFromPath());
  const { signUpMobile } = useGlobalContext();
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(0);
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
      const isSuccess = await signUpMobile(name, surname, phoneNumber, password, language);
      if (isSuccess) {
        localStorage.setItem('email', phoneNumber);
        setEmail('');
        setName('');
        setPhoneNumber('');
        setPassword('');
        console.log('Sign up successful');
        history(`/verify/${selectedLanguage}`);
      }
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
              name={name}
              setName={setName}
              surname={surname}
              setSurname={setSurname}
              email={phoneNumber}
              setPhoneNumber={setPhoneNumber}
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

export default SignUpMobile;
