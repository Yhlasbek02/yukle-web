import React, { useState, useEffect, useRef } from 'react'
import { Container, TypePart, From, Location, Properties, SingleProperty, Window, ModalOverlay, ModalContainer, ModalContent, ModalTitle, ModalInfo } from '../transportContainer/style'
import { FaArrowLeft } from "react-icons/fa"
import globusIcon from "../../assets/globus_1.svg"
import { Title } from '../transportContainer/style'
import AddTransport from '../addButtons/transport/addTransport'
import Pagination from '../../utils/paginationTag/pagination'
import enData from "../../utils/locales/en/transport.json";
import ruData from "../../utils/locales/ru/transport.json";
import trData from "../../utils/locales/tr/transport.json";

export default function MyTransport({ language }) {
  const [activeModal, setActiveModal] = useState(null);
  const [translation, setTranslations] = useState(enData);
  const openModal = (containerIndex) => {
    setActiveModal(containerIndex);
  };
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
  const modalRef = useRef();
  const closeModal = () => {
    setActiveModal(null);
  };
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [closeModal]);
  return (
    <>
      <Window>
        <Title>{translation.title}</Title>
        {Array(8).fill().map((_, containerIndex) => (
          <Container key={containerIndex} onClick={() => openModal(containerIndex)}>
            <TypePart>Transport type</TypePart>
            <Location>
              <From>
                <FaArrowLeft color='#000' style={{ marginRight: "0.5rem" }} />
                <img src={globusIcon} alt="" style={{ marginRight: "0.5rem" }} />
                city, country <br />
              </From>
              <From>
                <img src={globusIcon} alt="" />
                <FaArrowLeft color='#000' style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }} />
                city, country
              </From>
            </Location>
            <Properties>
              <SingleProperty><span>{translation.date}: </span><p>date</p> </SingleProperty>
            </Properties>
          </Container>
        ))}
      </Window>
      {activeModal !== null && (
        <ModalOverlay>
          <ModalContainer ref={modalRef}>
            <ModalContent>
              <ModalTitle>
                <p>{translation.modalTitle}</p>
              </ModalTitle>
              <ModalInfo>
                <span>{translation.modalName}</span>
                <h3>Name of user</h3>
              </ModalInfo>
              <ModalInfo>
                <span>{translation.modalNumber}</span>
                <h3>Mobile number of user</h3>
              </ModalInfo>
              <ModalInfo>
                <span>{translation.modalEmail}</span>
                <h3>Email of user</h3>
              </ModalInfo>
            </ModalContent>
          </ModalContainer>
        </ModalOverlay>
      )}
      <AddTransport language={language} />
      <Pagination />
    </>


  )
}
