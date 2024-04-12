import React, { useState, useEffect } from 'react';
import { Button, Buttons, Delete, FirstLine, Line, LogOut, SecondLine, SingleInfo, SupportTitle, TextArea, ThirdInfo, Title, Window } from './style';
import enData from "../../utils/locales/profile/en/en.json"
export default function Profile() {
  const [language, setLanguage] = useState("en");
  const [translation, setTranslations] = useState(enData);
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

  useEffect(() => {
    loadTranslations();
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
            <h3>Jelil Tuwakow</h3>
          </SingleInfo>
          <SingleInfo>
            <span>{translation.mobile_number}</span>
            <h3>99362242970</h3>
          </SingleInfo>
          <SingleInfo>
            <span>{translation.email}</span>
            <h3>dummycash17@gmail.com</h3>
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
}
