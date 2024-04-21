import React, { useState, useEffect } from 'react'
import cargoSvg from "../../../assets/cargo.svg"
import transport from "../../../assets/transport.svg"
import cargoActiveSvg from "../../../assets/cargoActive.svg"
import transportActiveSvg from "../../../assets/Trans.svg"
import { ButtonBox, FilterStyle, SwitchButtonWrapper, Text, FormBox, SwitchButtonContainer, SwitchButtonLabel, SwitchButton, ToggleButton, StyledLabel, StyledInput, StyledSelect, ButtonContainer, SearchButton } from './style'
import enData from "../../../utils/locales/en/filter.json";
import ruData from "../../../utils/locales/ru/filter.json";
import trData from "../../../utils/locales/tr/filter.json";
const SwitchButtonComponent = ({ isRight, handleClick, language }) => {
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
    <SwitchButtonWrapper>
      <ToggleButton isActive={!isRight} onClick={handleClick}>
      <div style={{ display: "flex" }}><img src={isRight ? cargoSvg : cargoActiveSvg} alt="" style={{ width: '1.2rem' }} /><span style={{marginLeft: "10px"}}>{translation.cargo}</span> </div>
      </ToggleButton>
      <SwitchButtonContainer>
        <SwitchButtonLabel></SwitchButtonLabel>
        <SwitchButton isRight={isRight} />
      </SwitchButtonContainer>
      <ToggleButton isActive={isRight} onClick={handleClick}>
      <div style={{ display: "flex"}}><img src={isRight ? transportActiveSvg : transport} alt="" style={{ width: '1.2rem'}} /><span style={{marginLeft: "10px"}}> {translation.transport}</span></div>
      </ToggleButton>
    </SwitchButtonWrapper>
  );
};


export default function Filter({language}) {
  const [isRight, setIsRight] = useState(false);
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
  const handleToggle = () => {
    setIsRight(prevState => !prevState);
  };
  return (
    <FilterStyle>
      <Text>{translation.title}</Text>
      <FormBox>
        <ButtonBox>
          <SwitchButtonComponent isRight={isRight} handleClick={handleToggle} language={language} />
        </ButtonBox>
      </FormBox>
      {isRight ? (
        <div>
          <StyledLabel htmlFor="type">{translation.type_transport}</StyledLabel>
          <StyledSelect id="type">
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
            <option value="3">Option 3</option>
          </StyledSelect>
          <StyledLabel htmlFor="location">{translation.belong}</StyledLabel>
          <StyledSelect id="location">
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
            <option value="3">Option 3</option>
          </StyledSelect>
          <StyledLabel htmlFor="affiliation">{translation.from}</StyledLabel>
          <StyledSelect id="affiliation">
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
            <option value="3">Option 3</option>
          </StyledSelect>
        </div>
      ) : (
        <div>
          <StyledLabel htmlFor="type">{translation.type_cargo}</StyledLabel>
          <StyledSelect id="type">
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
            <option value="3">Option 3</option>
          </StyledSelect>
          <StyledLabel htmlFor="from">{translation.from}</StyledLabel>
          <StyledSelect id="from">
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
            <option value="3">Option 3</option>
          </StyledSelect>
          <StyledLabel htmlFor="to">{translation.to}</StyledLabel>
          <StyledSelect id="to">
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
            <option value="3">Option 3</option>
          </StyledSelect>
          <StyledLabel htmlFor="weight">{translation.weight}</StyledLabel>
          <StyledInput type="number" id="weight" />
        </div>
      )}
      <ButtonContainer>
        <SearchButton>{translation.search}</SearchButton>
      </ButtonContainer>
      
    </FilterStyle>
  )
}
