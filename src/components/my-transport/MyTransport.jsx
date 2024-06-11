import React, { useState, useEffect, useRef } from 'react'
import { Container, TypePart, From, Location, Properties, SingleProperty, Window, ModalOverlay, ModalContainer, ModalContent, ModalTitle, ModalInfo } from '../transportContainer/style'
import { FaArrowLeft, FaFilter } from "react-icons/fa"
import globusIcon from "../../assets/globus_1.svg"
import { Title } from '../transportContainer/style'
import AddTransport from '../addButtons/transport/addTransport'
import Pagination from '../../utils/paginationTag/pagination'
import enData from "../../utils/locales/en/transport.json";
import ruData from "../../utils/locales/ru/transport.json";
import trData from "../../utils/locales/tr/transport.json";
import { useGlobalContext } from '../../context/globalContext'
import emptyImage from "../../assets/empty.svg"
import LoadingSpinner from '../../utils/spinner/Loading'
import { Mobile } from '../../utils/switchButtons.jsx/style'
import { FiFilter } from 'react-icons/fi'
export default function MyTransport({ language }) {
  const { getMyTransports } = useGlobalContext();
  const [loading, setLoading] = useState(true);
  const [transports, setTransports] = useState([]);
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

  const fetchTransports = async (pageNumber) => {
    try {
      setLoading(true);
      const transportData = await getMyTransports(pageNumber, language);
      setTransports(transportData.transports);
      setPage(transportData.currentPage);
      setTotalPage(transportData.totalPages);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }


  useEffect(() => {
    fetchTransports(page)
    loadTranslations();
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
        <Mobile>
          <Title>{translation.title}</Title>
          <FiFilter style={{ fontSize: "1.5rem", color: "#fff", marginTop: "1rem", marginRight: "1rem"}} />
        </Mobile>
        
        {
          loading ? (
            <LoadingSpinner />
          ) : transports.length > 0 ? (
            transports.map((transport) => (
              <Container key={transport.uuid}>
                <TypePart>{getName(transport.type, 'name')}</TypePart>
                <Location>
                  <From>
                    <FaArrowLeft color='#000' style={{ marginRight: "0.5rem" }} />
                    <img src={globusIcon} alt="" style={{ marginRight: "0.5rem" }} />
                    {getName(transport.affiliation_country, 'name')} <br />
                  </From>
                  <From>
                    <img src={globusIcon} alt="" />
                    <FaArrowLeft color='#000' style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }} />
                    {transport.location_city ? getName(transport.location_city, 'name') : ''}, {getName(transport.location_country, 'name')}
                  </From>
                </Location>
                <Properties>
                  <SingleProperty><span>{translation.date}: </span><p>{formatDate(transport.createdAt)}</p> </SingleProperty>
                </Properties>
              </Container>
            ))) : (
            <div style={{justifyContent: "center", alignItems: "center", marginLeft: "20%"}}>
              <img style={{width: "90%", height: "100%"}} src={emptyImage} />
            </div>
          )}
        {transports.length > 0 ? (
          <Pagination currentPage={page} totalPages={totalPage} onPrevPage={handlePrevPage} onNextPage={handleNextPage} />
        ) : (<></>)}
      </Window>
      <AddTransport language={language} />
    </>
  )
}
