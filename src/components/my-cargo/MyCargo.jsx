import React, { useState, useEffect, useRef } from 'react'
import { Container, TypePart, From, Location, Properties, SingleProperty, Window, ModalOverlay, ModalContainer, ModalContent, ModalTitle, ModalInfo } from '../cargoContainer/style'
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"
import globusIcon from "../../assets/globus_1.svg"
import { Title } from '../transportContainer/style'
import AddCargo from '../addButtons/cargo/addCargo'
import Pagination from '../../utils/paginationTag/pagination'
import enData from "../../utils/locales/en/cargo.json";
import ruData from "../../utils/locales/ru/cargo.json";
import trData from "../../utils/locales/tr/cargo.json";
import emptyImage from "../../assets/empty.svg"
import { useGlobalContext } from '../../context/globalContext'
import LoadingSpinner from '../../utils/spinner/Loading'
import {  Mobile } from '../../utils/switchButtons.jsx/style'
import { FiFilter } from 'react-icons/fi'
export default function MyCargo({ language }) {
  const { getMyCargos } = useGlobalContext();
  const [loading, setLoading] = useState(true);
  const [cargos, setCargos] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [activeModal, setActiveModal] = useState(null);
  const [translation, setTranslations] = useState(enData);
  const loadTranslations = () => {
    const translations = {
      'en': enData,
      'ru': ruData,
      'tr': trData
    };
    setTranslations(translations[language] || enData);
  };

  const fetchCargos = async (pageNumber) => {
    try {
      setLoading(true);
      const cargoData = await getMyCargos(pageNumber, language);
      setCargos(cargoData.cargos);
      setPage(cargoData.currentPage);
      setTotalPage(cargoData.totalPages);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }


  useEffect(() => {
    fetchCargos(page);
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

  const getName = (cargo, name) => {
    switch (language) {
      case 'ru':
        return cargo[`${name}Ru`];
      case 'tr':
        return cargo[`${name}Tr`];
      default:
        return cargo[`${name}En`];
    }
  };


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const handlePrevPage = () => {
    if (page > 1) {
      fetchCargos(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPage) {
      fetchCargos(page + 1);

    }
  };

  return (
    <>
      <Window>
        <Mobile>
          <Title>{translation.title}</Title>
          <FiFilter style={{ fontSize: "1.5rem", color: "#fff", marginTop: "1rem", marginRight: "1rem"}} />
        </Mobile>
        {loading ? (
          <LoadingSpinner />
        ) : cargos.length > 0 ? (
          cargos.map((cargo) => (
            <Container key={cargo.uuid}>
              <TypePart>{getName(cargo.type, 'name')}</TypePart>
              <Location>
                <From>
                  <img src={globusIcon} alt="" /><FaArrowRight color='#000' style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }} /> {cargo.from_city ? getName(cargo.from_city, 'name') : ''} {cargo.from_country ? getName(cargo.from_country, 'name') : ''} <br />
                </From>
                <From>
                  <img src={globusIcon} alt="" /><FaArrowLeft color='#000' style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }} /> {cargo.to_city ? getName(cargo.to_city, 'name') : ''} {cargo.to_country ? getName(cargo.to_country, 'name') : ''}
                </From>
              </Location>
              <Properties>
                <SingleProperty><span>{translation.weight}: </span><p>{cargo.weight}</p> </SingleProperty>
                <SingleProperty><span>{translation.date}: </span><p>{formatDate(cargo.createdAt)}</p> </SingleProperty>
              </Properties>

            </Container>
          ))
        ) : (
          <div style={{ justifyContent: "center", alignItems: "center", marginLeft: "20%" }}>
            <img style={{ width: "90%", height: "100%" }} src={emptyImage} />
          </div>
        )}

        {cargos.length > 0 ? (
          <Pagination currentPage={page} totalPages={totalPage} onPrevPage={handlePrevPage} onNextPage={handleNextPage} />
        ) : (<></>)}

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
      <AddCargo language={language} />
    </>


  )
}
