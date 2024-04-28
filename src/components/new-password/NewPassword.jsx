import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../../context/globalContext';
import { useNavigate } from 'react-router-dom';
import { AuthStyle } from '../../styles/authSidebar';
import AuthSidebar from '../authSidebar/authSidebar';
import { Card, Container, Input, EyeIcon, InputContainer } from '../../styles/authCard';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import LanguageSelectForAuth from '../../utils/languageForAuth';
import enData from "../../utils/locales/en/new_password.json";
import ruData from "../../utils/locales/ru/new_password.json";
import trData from "../../utils/locales/tr/new_password.json";
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

function NewPassword() {
  const [selectedLanguage, setSelectedLanguage] = useState(getLanguageFromPath());
  const { changePassword } = useGlobalContext();
  const [password, setPassword] = useState('');
  const [password_conf, setPassword_Conf] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
      const isSuccess = await changePassword(password, password_conf, selectedLanguage)
      if (isSuccess) {
        history(`/main/${selectedLanguage}`);
      }
    } catch (error) {
      alert(error);
      setError(error.response?.data?.message || 'Sign up failed');
    }
  };


  const Eye = ({ showPassword, togglePasswordVisibility }) => (
    <EyeIcon onClick={togglePasswordVisibility}>
      {showPassword ? <FiEyeOff /> : <FiEye />}
    </EyeIcon>
  );

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
              <h1>
                {translation.title}
              </h1>
              <InputContainer>
                <Input placeholder={translation.password} value={password} onChange={(e) => setPassword(e.target.value)} type={showPassword ? 'text' : 'password'} />
                <Eye showPassword={showPassword} togglePasswordVisibility={() => setShowPassword(!showPassword)} />
              </InputContainer>
              <InputContainer>
                <Input placeholder={translation.confirm} value={password_conf} onChange={(e) => setPassword_Conf(e.target.value)} type={showPassword ? 'text' : 'password'} />
                <Eye showPassword={showPassword} togglePasswordVisibility={() => setShowPassword(!showPassword)} />
              </InputContainer>

              <div style={{ marginTop: "130px" }}>
                <button type="submit">
                  {translation.button}
                </button>
              </div>
            </form>
          </Container>
        </Card>
      </div>
    </AuthStyle>
  );
}

export default NewPassword;
