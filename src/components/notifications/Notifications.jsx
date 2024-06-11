import React, { useState, useEffect } from 'react'
import cargoSvg from "../../assets/cargo.svg"
import transport from "../../assets/transport.svg"
import cargoActiveSvg from "../../assets/cargoActive.svg"
import transportActiveSvg from "../../assets/transActive.svg"
import { SwitchButtonWrapper, ToggleButton, SwitchButtonContainer, FormBox, ButtonBox, SwitchButtonLabel, SwitchButton } from '../../utils/switchButtons.jsx/style'
import Pagination from '../../utils/paginationTag/pagination';
import TransportNotifications from '../transportNotifications/transportNotifications'
import CargoNotifications from '../cargoNotifications/cargoNotifications'
import enData from "../../utils/locales/en/button.json";
import ruData from "../../utils/locales/ru/button.json";
import trData from "../../utils/locales/tr/button.json";
import { Container, TypePart, From, Location, Properties, SingleProperty, Window, ModalOverlay, ModalContainer, ModalContent, ModalTitle, ModalInfo, Title } from '../transportContainer/style'
import { useGlobalContext } from '../../context/globalContext'
const SwitchButtonComponent = ({ isRight, handleClick, language }) => {
  const { getNotifications } = useGlobalContext();
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
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

  const fetchNotifications = async (pageNumber) => {
    try {
      setLoading(true);
      const notificationsData = await getNotifications(language, pageNumber);
      setNotifications(notifications.data);
      setPage(notificationsData.currentPage);
      setTotalPage(notificationsData.totalPages);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadTranslations();
    fetchNotifications(page);
  }, [language]);


  const getName = (transport, name) => {
    switch (language) {
      case 'ru':
        return transport[`${name}Ru`];
      case 'tr':
        return transport[`${name}Tr`];
      default:
        return transport[`${name}En`];
    }
  };
  return (
    <SwitchButtonWrapper>
      <ToggleButton $isActive={!isRight} onClick={handleClick}>
        <div style={{ display: "flex", width: "50%", justifyContent: "center", alignItems: 'center' }}><img src={isRight ? cargoSvg : cargoActiveSvg} alt="" style={{ width: '1.2rem', height: '1.2rem' }} /><span style={{ marginLeft: "10px" }}>{translation.cargo}</span> </div>
      </ToggleButton>
      <SwitchButtonContainer>
        <SwitchButtonLabel></SwitchButtonLabel>
        <SwitchButton isRight={isRight} />
      </SwitchButtonContainer>
      <ToggleButton $isActive={isRight} onClick={handleClick}>
        <div style={{ display: "flex", width: '50%', justifyContent: "center", alignItems: 'center' }}><img src={isRight ? transportActiveSvg : transport} alt="" style={{ width: '1.2rem', height: '1.2rem' }} /><span style={{ marginLeft: "10px" }}>{translation.transport}</span></div>
      </ToggleButton>
    </SwitchButtonWrapper>
  );
};

export default function Notifications({ language }) {
  const [isRight, setIsRight] = useState(false);

  const handleToggle = () => {
    setIsRight(prevState => !prevState);
  };
  return (
    <>

      <Window>

        <FormBox>
          <ButtonBox>
            <SwitchButtonComponent isRight={isRight} handleClick={handleToggle} language={language} />
          </ButtonBox>
        </FormBox>
        {isRight ? (
          <>
            <TransportNotifications language={language} />
          </>

        ) : (
          <>
            <CargoNotifications language={language} />
          </>
        )}
      </Window>

      {/* <h3>Notifications</h3> */}

    </>
  )
}
