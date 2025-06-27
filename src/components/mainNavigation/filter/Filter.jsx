import React, { useState, useEffect } from 'react'
import cargoSvg from "../../../assets/cargo.svg"
import transport from "../../../assets/transport.svg"
import cargoActiveSvg from "../../../assets/cargoActive.svg"
import transportActiveSvg from "../../../assets/Trans.svg"
import cargoMobileSvg from "../../../assets/cargoActive.svg"
import transportMobileSvg from "../../../assets/Trans.svg"
import cargoActiveMobileSvg from "../../../assets/cargo.svg"
import transportActiveMobileSvg from "../../../assets/transport.svg"
import { ButtonBox, FilterStyle, SwitchButtonWrapper, Text, FormBox, SwitchButtonContainer, SwitchButtonLabel, SwitchButton, ToggleButton, StyledLabel, StyledInput, StyledSelect, ButtonContainer, SearchButton, ModalOption } from './style'
import enData from "../../../utils/locales/en/filter.json";
import ruData from "../../../utils/locales/ru/filter.json";
import trData from "../../../utils/locales/tr/filter.json";
import { useGlobalContext } from '../../../context/globalContext'
import { useNavigate } from "react-router-dom";

const SwitchButtonComponent = ({ isRight, handleClick, language }) => {
  const [translation, setTranslations] = useState(enData);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 769);
  const loadTranslations = () => {
    const translations = {
      'en': enData,
      'ru': ruData,
      'tr': trData
    };
    setTranslations(translations[language] || enData);
  };

  useEffect(() => {
    loadTranslations();
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 769);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [language]);

  return (
    <SwitchButtonWrapper>
      <ToggleButton $isActive={!isRight} onClick={handleClick}>
        <div style={{ display: "flex" }}>
          <img src={isRight ? (isMobile ? cargoMobileSvg : cargoSvg) : (isMobile ? cargoActiveMobileSvg : cargoActiveSvg)} alt="" style={{ width: '1.2rem' }} />
          <span style={{ marginLeft: "10px" }}>{translation.cargo}</span>
        </div>
      </ToggleButton>
      <SwitchButtonContainer>
        <SwitchButtonLabel></SwitchButtonLabel>
        <SwitchButton isRight={isRight} />
      </SwitchButtonContainer>
      <ToggleButton $isActive={isRight} onClick={handleClick}>
        <div style={{ display: "flex" }}>
          <img src={isRight ? (isMobile ? transportActiveMobileSvg : transportActiveSvg) : (isMobile ? transportMobileSvg : transport)} alt="" style={{ width: '1.2rem' }} />
          <span style={{ marginLeft: "10px" }}>{translation.transport}</span>
        </div>
      </ToggleButton>
    </SwitchButtonWrapper>
  );
};

export default function Filter({ language, isRight, setIsRight, setIsModalOpen }) {
  const { getCargoTypes, getTransportTypes, getCountries } = useGlobalContext();
  const [transportTypes, setTransportTypes] = useState([]);
  const [cargoTypes, setCargoTypes] = useState([]);
  const [countries, setCountries] = useState([]);
  const [cargoTypeId, setCargoTypeId] = useState('');
  const [transportTypeId, setTransportTypeId] = useState('');
  const [countryId, setCountryId] = useState('');
  const [transportFrom, setTransportFrom] = useState('');
  const [toId, setToId] = useState('');
  const [fromId, setFromId] = useState('');
  const [weight, setWeight] = useState('');
  const [loading, setLoading] = useState(true);
  const [translation, setTranslations] = useState(enData);
  const navigate = useNavigate();

  useEffect(() => {
    const lastButtonState = localStorage.getItem('isRight');
    setIsRight(lastButtonState === 'true');
  }, []);

  const handleToggle = () => {
    setIsRight(prevState => !prevState);
    localStorage.setItem('isRight', (!isRight).toString());
    setCargoTypeId('');
    setTransportTypeId('');
    setCountryId('');
    setTransportFrom('');
    setToId('');
    setFromId('');
    setWeight('');
    navigate({
      search: ''
    });
  };

  const handleSearch = () => {
    let queryString;
    if (isRight) {
      localStorage.setItem("activeLink", "Main");
      localStorage.setItem("isRight", "true");
      queryString = `?typeId=${transportTypeId}&location=${countryId}&country=${transportFrom}`;
    } else {
      localStorage.setItem("activeLink", "Main");
      localStorage.setItem("isRight", "false");
      queryString = `?type=${cargoTypeId}&from=${fromId}&to=${toId}&weight=${weight}`;
    }

    navigate({
      search: queryString
    });
    if (typeof setIsModalOpen === 'function') {
      setIsModalOpen(false);
    } else {
      console.error('setIsModalOpen is not a function');
    }
  };

  const loadTranslations = () => {
    const translations = {
      'en': enData,
      'ru': ruData,
      'tr': trData
    };
    setTranslations(translations[language] || enData);
  };

  const fetchTypes = async () => {
    try {
      setLoading(true);
      const cargoTypesData = await getCargoTypes(language);
      setCargoTypes(cargoTypesData.types);

      const transportTypesData = await getTransportTypes(language);
      setTransportTypes(transportTypesData.types);

      const countriesData = await getCountries(language, '');
      setCountries(countriesData.countries);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadTranslations();
    fetchTypes();
  }, [language]);

  const getName = (type) => {
    switch (language) {
      case 'en':
        return type.nameEn;
      case 'ru':
        return type.nameRu;
      case 'tr':
        return type.nameTr;
      default:
        return type.nameEn;
    }
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
          <StyledSelect id="type" onChange={(e) => setTransportTypeId(e.target.value)}>
            <ModalOption>{" "}</ModalOption>
            {transportTypes.map((type) => (
              <ModalOption value={type.id} key={type.id} >
                {getName(type)}
              </ModalOption>
            ))}
          </StyledSelect>
          <StyledLabel htmlFor="location">{translation.belong}</StyledLabel>
          <StyledSelect id="location" onChange={(e) => setCountryId(e.target.value)}>
            <ModalOption>{" "}</ModalOption>
            {countries.map((country) => (
              <ModalOption value={country.id} key={country.id}>
                {getName(country)}
              </ModalOption>
            ))}
          </StyledSelect>
          <StyledLabel htmlFor="affiliation">{translation.from}</StyledLabel>
          <StyledSelect id="affiliation" onChange={(e) => setTransportFrom(e.target.value)}>
            <ModalOption>{" "}</ModalOption>
            {countries.map((country) => (
              <ModalOption value={country.id} key={country.id}>
                {getName(country)}
              </ModalOption>
            ))}
          </StyledSelect>
        </div>
      ) : (
        <div>
          <StyledLabel htmlFor="type">{translation.type_cargo}</StyledLabel>
          <StyledSelect id="type" onChange={(e) => setCargoTypeId(e.target.value)}>
            <ModalOption>{" "}</ModalOption>
            {cargoTypes.map((type) => (
              <ModalOption value={type.id} key={type.id} >
                {getName(type)}
              </ModalOption>
            ))}
          </StyledSelect>
          <StyledLabel htmlFor="from">{translation.from}</StyledLabel>
          <StyledSelect id="from" onChange={(e) => setFromId(e.target.value)}>
            <ModalOption>{" "}</ModalOption>
            {countries.map((country) => (
              <ModalOption value={country.id} key={country.id}>
                {getName(country)}
              </ModalOption>
            ))}
          </StyledSelect>
          <StyledLabel htmlFor="to">{translation.to}</StyledLabel>
          <StyledSelect id="to" onChange={(e) => setToId(e.target.value)}>
            <ModalOption>{" "}</ModalOption>
            {countries.map((country) => (
              <ModalOption value={country.id} key={country.id}>
                {getName(country)}
              </ModalOption>
            ))}
          </StyledSelect>
          <StyledLabel htmlFor="weight">{translation.weight}</StyledLabel>
          <StyledInput type="number" id="weight" value={weight} onChange={(e) => setWeight(e.target.value)} />
        </div>
      )}
      <ButtonContainer>
        <SearchButton onClick={handleSearch}>{translation.search}</SearchButton>
      </ButtonContainer>
    </FilterStyle>
  )
}
