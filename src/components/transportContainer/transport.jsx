import React, { useEffect, useRef, useState } from 'react';
import { Container, From, Location, Properties, TypePart, SingleProperty, Window, ModalOverlay, ModalContainer, ModalContent, ModalTitle, ModalInfo } from './style';
import globusIcon from '../../assets/globus_1.svg';
import { FaArrowLeft } from 'react-icons/fa';
import AddTransport from '../addButtons/transport/addTransport';
import enData from "../../utils/locales/en/transport.json";
import ruData from "../../utils/locales/ru/transport.json";
import trData from "../../utils/locales/tr/transport.json";
import { useGlobalContext } from '../../context/globalContext';
import Pagination from '../../utils/paginationTag/pagination';
import LoadingSpinner from '../../utils/spinner/Loading';
import { useLocation } from 'react-router-dom';

export default function Transport({ language }) {
  const { getTransports, getSingleTransport } = useGlobalContext();
  const [loading, setLoading] = useState(true);
  const [activeModal, setActiveModal] = useState(null);
  const [translation, setTranslations] = useState(enData);
  const [transports, setTransports] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [singleTransport, setSingleTransport] = useState(null);
  const search = useLocation().search;
  const type = new URLSearchParams(search).get("typeId") || '';
  const location = new URLSearchParams(search).get("location") || '';
  const country = new URLSearchParams(search).get("country") || '';
  const openModal = async (id) => {
    try {
      setLoading(true);
      const transportData = await getSingleTransport(id, language);
      setSingleTransport(transportData);
      setActiveModal(id);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
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

  const fetchTransports = async (pageNumber) => {
    try {
      setLoading(true);
      const transportData = await getTransports(pageNumber, language, 10, type, location, country);
      setTransports(transportData.transports);
      setPage(transportData.currentPage);
      setTotalPage(transportData.totalPages);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTransports(page);
    loadTranslations();
  }, [language]);


  const closeModal = () => {
    setActiveModal(null);
    setSingleTransport(null);
  };

  const modalRef = useRef();

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
  }, []);

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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const handlePrevPage = () => {
    if (page > 1) {
      fetchTransports(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPage) {
      fetchTransports(page + 1);

    }
  };

  return (
    <>
      <Window>
        {loading ? (
          <LoadingSpinner />
        ) : transports.length > 0 ? (
          transports.map((transport) => (
            <Container key={transport.uuid} onClick={() => openModal(transport.uuid)}>
            <TypePart>
              {getName(transport.type, 'name')}
            </TypePart>
            <Location>
              <From>
                <FaArrowLeft color='#000' style={{ marginRight: "0.5rem" }} />
                <img src={globusIcon} alt="" style={{ marginRight: "0.5rem" }} />
                {getName(transport.affiliation_country, 'name')} <br />
              </From>
              <From>
                <img src={globusIcon} alt="" />
                <FaArrowLeft color='#000' style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }} />
                {transport.location_city ? getName(transport.location_city, 'name'): ''}, {getName(transport.location_country, 'name')}
              </From>
            </Location>
            <Properties>
              <SingleProperty><span>{translation.date}: </span><p>{formatDate(transport.createdAt)}</p> </SingleProperty>
            </Properties>
          </Container>
          ))
        ) : (
          <div>No transport</div>
        )}
        {transports.length > 0 ? (
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
                <h3>
                  {singleTransport.transport.name}
                </h3>
              </ModalInfo>
              <ModalInfo>
                <span>{translation.modalNumber}</span>
                <h3>
                {singleTransport.transport.phoneNumber}
                </h3>
              </ModalInfo>
              <ModalInfo>
                <span>{translation.modalEmail}</span>
                <h3>
                {singleTransport.transport.email}
                </h3>
              </ModalInfo>
            </ModalContent>
          </ModalContainer>
        </ModalOverlay>
      )}
      <AddTransport language={language} />
    </>
  );
}
