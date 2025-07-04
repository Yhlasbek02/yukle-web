import React, { useState, useRef, useEffect } from 'react'
import { Container, TypePart, From, Location, Properties, SingleProperty, Window, ModalOverlay, ModalContainer, ModalContent, ModalTitle, ModalInfo, Title } from '../transportContainer/style'
import { FaArrowLeft } from "react-icons/fa"
import globusIcon from "../../assets/globus_1.svg"
import AddTransport from '../addButtons/transport/addTransport'
import enData from "../../utils/locales/en/transport.json";
import ruData from "../../utils/locales/ru/transport.json";
import trData from "../../utils/locales/tr/transport.json";
import { useGlobalContext } from '../../context/globalContext'
import LoadingSpinner from '../../utils/spinner/Loading'
import Pagination from '../../utils/paginationTag/pagination'
import SupportButton from '../supportButton/supportButton'

export default function TransportNotifications({ language }) {
    const { getNotifications, getSingleTransport } = useGlobalContext();
    const [loading, setLoading] = useState(true);
    const [activeModal, setActiveModal] = useState(null);
    const [translation, setTranslations] = useState(enData);
    const [transports, setTransports] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [singleTransport, setSingleTransport] = useState(null);
    const openModal = async (id) => {
        try {
            setLoading(true);
            const transportData = await getSingleTransport(id, language);
            setSingleTransport(transportData);
            setActiveModal(id);
            setLoading(false);
        } catch (error) {
            console.error(error)
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

    const fetchTransportNotifications = async (pageNumber) => {
        try {
            setLoading(true);
            const data = await getNotifications(language, pageNumber, "transport");
            setTransports(data.notifications);
            setPage(data.currentPage);
            setTotalPage(data.totalPages);
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchTransportNotifications(page);
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
    }, [closeModal]);

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
            fetchTransportNotifications(page - 1);
        }
    };

    const handleNextPage = () => {
        if (page < totalPage) {
            fetchTransportNotifications(page + 1);

        }
    };



    return (
        <>
            <Window>
                {loading ? (
                    <LoadingSpinner />
                ) : transports.length > 0 ? (
                    transports.map((transport) => (
                        <Container key={transport.relatedEntity.uuid} onClick={() => openModal(transport.relatedEntity.uuid)}>
                            <TypePart>
                                {getName(transport.relatedEntity.type, 'name')}
                            </TypePart>
                            <Location>
                                <From>
                                    <FaArrowLeft color='#000' style={{ marginRight: "0.5rem" }} />
                                    <img src={globusIcon} alt="" style={{ marginRight: "0.5rem" }} />
                                    {transport.relatedEntity.affiliation_country ? getName(transport.relatedEntity.affiliation_country, 'name') : ''} <br />
                                </From>
                                <From>
                                    <img src={globusIcon} alt="" />
                                    <FaArrowLeft color='#000' style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }} />
                                    {transport.relatedEntity.location_city ? getName(transport.relatedEntity.location_city, 'name') : ''}, {transport.relatedEntity.location_country ? getName(transport.relatedEntity.location_country, 'name'): ''}
                                </From>
                            </Location>
                            <Properties>
                                <SingleProperty><span>{translation.date}: </span><p>{formatDate(transport.relatedEntity.createdAt)}</p> </SingleProperty>
                            </Properties>
                        </Container>
                    ))
                ) : (
                    <div>No notification</div>
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
                                <p>
                                    {translation.modalTitle}
                                </p>
                            </ModalTitle>
                            <ModalInfo>
                                <span>
                                    {translation.modalName}
                                </span>
                                <h3>{singleTransport.transport.name}</h3>
                            </ModalInfo>
                            <ModalInfo>
                                <span>
                                    {translation.modalNumber}
                                </span>
                                <h3>{singleTransport.transport.phoneNumber}</h3>
                            </ModalInfo>
                            <ModalInfo>
                                <span>
                                    {translation.modalEmail}
                                </span>
                                <h3>{singleTransport.transport.email}</h3>
                            </ModalInfo>
                        </ModalContent>
                    </ModalContainer>
                </ModalOverlay>
            )}
            <SupportButton language={language} />
            <AddTransport language={language} />
        </>


    )
}
