import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../../context/globalContext';
import { useNavigate } from 'react-router-dom';
import { AuthStyle } from '../../styles/authSidebar';
import { Link } from 'react-router-dom';
import AuthSidebar from '../authSidebar/authSidebar';
import LanguageSelectForAuth from '../../utils/languageForAuth';
import { Card, Container, RegisterLink } from '../../styles/authCard';
import enData from "../../utils/locales/en/forgot.json";
import ruData from "../../utils/locales/ru/forgot.json";
import trData from "../../utils/locales/tr/forgot.json";

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


function ForgotEmail() {
  const [selectedLanguage, setSelectedLanguage] = useState(getLanguageFromPath());
  const { signUpEmail } = useGlobalContext();
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [language, setLang] = useState('en');
  const [error, setError] = useState('');
  const history = useNavigate();
  useEffect(() => {
    setSelectedLanguage(getLanguageFromPath());
  }, []);
  const [translation, setTranslations] = useState(enData);
  const loadTranslations = () => {
    switch (selectedLanguage) {
      case 'en':
        setTranslations(enData);
        break;
      case 'ru':
        setTranslations(ruData);
        break;
      case 'tr':
        setTranslations(trData);
        break;
      default:
        setTranslations(enData);
    }
  };

  useEffect(() => {
    loadTranslations();
  }, [selectedLanguage]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // await signUpEmail(name, surname, email, password, language);
      // localStorage.setItem('email', email);
      // setEmail('');
      // setName('');
      // setSurname('');
      // setPassword('');
      // console.log('Sign up successful');
      history(`/verify/${selectedLanguage}`);
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
            <form onSubmit={handleSubmit}>
              <h1 style={{ fontSize: "2rem" }}>
                {translation.title}
              </h1>
              <input type="email" placeholder={translation.email} value={email} onChange={(e) => setEmail(e.target.value)} />
              <br />
              <span className='sign-mobile'>{translation.paragraph}&nbsp;<RegisterLink><Link to={`/forgot-mobile/${selectedLanguage}`}>{translation.option_mobile}</Link></RegisterLink></span><br />
              <div style={{ marginTop: "100px" }}>
                <button type="submit" style={{ marginTop: "5.5rem" }}>
                  {translation.button}  
                </button><br />
              </div>


            </form>
            {error && <p>{error}</p>}
          </Container>

        </Card>
      </div>


    </AuthStyle>
  );
}

export default ForgotEmail;
