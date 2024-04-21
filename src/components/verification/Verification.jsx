import React, { useState, useEffect, useRef } from 'react';
import { useGlobalContext } from '../../context/globalContext';
import { useNavigate } from 'react-router-dom';
import { AuthStyle } from '../../styles/authSidebar';
import { Link } from 'react-router-dom';
import AuthSidebar from '../authSidebar/authSidebar';
import LanguageSelectForAuth from '../../utils/languageForAuth';
import { Card, Container, InputField, Timer, Paragraph, CodeContainer, TryAgainMessage } from '../../styles/authCard';
import enData from "../../utils/locales/en/verify.json";
import ruData from "../../utils/locales/ru/verify.json";
import trData from "../../utils/locales/tr/verify.json";

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

function Verification() {
  const [selectedLanguage, setSelectedLanguage] = useState(getLanguageFromPath());
  const { signUpEmail } = useGlobalContext();
  const [language, setLang] = useState('en');
  const [showTryAgain, setShowTryAgain] = useState(false);
  const [remainingTime, setRemainingTime] = useState(120); // 5 minutes in seconds
  const [inputsDisabled, setInputsDisabled] = useState(false);
  const [otp, setOTP] = useState(['', '', '', '']);
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
  const history = useNavigate();

  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  useEffect(() => {
    let timer;
    if (remainingTime > 0) {
      timer = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      setShowTryAgain(true);
      setInputsDisabled(true);
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [remainingTime]);

  const handleInputChange = (index, value) => {
    const newOTP = [...otp];
    newOTP[index] = value;

    if (value !== '') {
      if (index < inputRefs.length - 1) {
        inputRefs[index + 1].current.focus();
      }
    } else {
      if (index > 0) {
        inputRefs[index - 1].current.focus();
      }
    }

    setOTP(newOTP);
  };

  const handleKeyDown = (index, event) => {
    if (event.key === 'Backspace' && index > 0 && otp[index] === '') {
      inputRefs[index - 1].current.focus();
    }
  };

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
      history(`/new-password/${language}`);
    } catch (error) {
      alert(error);
      setError(error.response?.data?.message || 'Sign up failed');
    }
  };
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;
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
              <h1 style={{ fontWeight: 800 }}>
                {translation.title}
              </h1>
              <Timer>{`${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`}</Timer>
              <Paragraph>
                {translation.paragraph}
              </Paragraph>
              <CodeContainer>
                {otp.map((digit, index) => (
                  <InputField
                    key={index}
                    ref={inputRefs[index]}
                    value={digit}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    type='text'
                    maxLength={1}
                    disabled={inputsDisabled}
                  />
                ))}
              </CodeContainer>
              <div style={{ marginTop: "60px" }}>
                {showTryAgain && (
                  <TryAgainMessage to={`/forgot-email/${language}`}>
                    {translation.try_again}
                  </TryAgainMessage>
                )}
                <br />
                <button type="submit" style={{ marginTop: "1.5rem" }} disabled={showTryAgain || inputsDisabled}>
                  {translation.button}
                </button><br />
              </div>
            </form>
          </Container>
        </Card>
      </div>
    </AuthStyle>
  );
}

export default Verification;
