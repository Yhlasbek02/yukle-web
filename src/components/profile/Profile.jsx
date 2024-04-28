import React, { useState, useEffect } from 'react';
import { Button, Buttons, Delete, FirstLine, Line, LogOut, SecondLine, SingleInfo, SupportTitle, TextArea, ThirdInfo, Title, Window } from './style';
import enData from "../../utils/locales/en/profile.json";
import ruData from "../../utils/locales/ru/profile.json";
import trData from "../../utils/locales/tr/profile.json";
import { useGlobalContext } from '../../context/globalContext';


const Profile = ({ language }) => {
  const [translation, setTranslations] = useState(enData);
  const [profile, setProfile] = useState({});
  const {getProfile} = useGlobalContext();
  const loadTranslations = () => {
    switch (language) {
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

  const fetchProfile = async (lang) => {
    try {
      const data = await getProfile(lang);
      console.log(data);
      setProfile(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadTranslations();
    fetchProfile(language)
  }, [language]);

  

  return (
    <Window>
      <FirstLine>
        <Title>{translation.title}</Title>
        <Buttons>
          <LogOut>{translation.logout}</LogOut>
          <Delete>{translation.delete}</Delete>
        </Buttons>
      </FirstLine>
      <SecondLine>
        <Line>
          <SingleInfo>
            <span>{translation.name}</span>
            <h3>
              {profile.name} {profile.surname}
            </h3>
          </SingleInfo>
          <SingleInfo>
            <span>{translation.mobile_number}</span>
            <h3>
              {profile.phoneNumber || ''}
            </h3>
          </SingleInfo>
          <SingleInfo>
            <span>{translation.email}</span>
            <h3>
              {profile.email}
            </h3>
          </SingleInfo>
        </Line>
        <Line>
          <SingleInfo>
            <span>{translation.language}</span>
            <h3>Language</h3>
          </SingleInfo>
          <SingleInfo>
            <span>{translation.notifications}</span>
            <h3>{translation.transport}</h3>
          </SingleInfo>
          <SingleInfo>
            <span>{translation.notifications}</span>
            <h3>{translation.cargo}</h3>
          </SingleInfo>
        </Line>
      </SecondLine>
      <ThirdInfo>
        <SupportTitle>{translation.support_title}</SupportTitle>
        <TextArea>
          {translation.placeholder}
        </TextArea><br />
        <Button>{translation.button}</Button>
      </ThirdInfo>
    </Window>
  );
};

export default Profile;
