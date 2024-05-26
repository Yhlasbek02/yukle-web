import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../../context/globalContext';
import { useNavigate } from 'react-router-dom';
import { AuthStyle, Left, Right } from '../../styles/authSidebar';
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


function ForgotMobile() {
  const [selectedLanguage, setSelectedLanguage] = useState(getLanguageFromPath());
  const [mobile, setMobile] = useState('');
  const { sendCodeToMobile } = useGlobalContext();
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
      const response = await sendCodeToMobile(mobile, selectedLanguage);
      if (response) {
        localStorage.setItem('email', mobile);
        setMobile('');
        history(`/verify-forgot/${selectedLanguage}`);
      }
    } catch (error) {
      console.error(error);
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
            <form onSubmit={handleSubmit}>
              <h1 style={{ fontSize: "1.8rem" }}>
                {translation.Title}
              </h1>
              <input type="number" placeholder={translation.mobile} value={mobile} onChange={(e) => setMobile(e.target.value)} />
              <br />
              <span className='sign-mobile'>{translation.paragraph}&nbsp;<RegisterLink><Link to={`/forgot-email/${selectedLanguage}`}>{translation.option_email}</Link></RegisterLink></span><br />
              <div style={{ marginTop: "100px" }}>
                <button type="submit" style={{ marginTop: "5.5rem" }}>
                  {translation.button}  
                </button><br />
              </div>


            </form>
          </Container>

        </Card>
        </Left>


    </AuthStyle>
  );
}

export default ForgotMobile;
