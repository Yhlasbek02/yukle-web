import React, { useState, useRef, useEffect } from 'react';
import { Container, TypePart, From, Location, Properties, SingleProperty, Window, ModalOverlay, ModalContainer, ModalContent, ModalTitle, ModalInfo } from './style';
import globusIcon from "../../assets/globus_1.svg";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import AddCargo from '../addButtons/cargo/addCargo';
import enData from "../../utils/locales/en/cargo.json";
import ruData from "../../utils/locales/ru/cargo.json";
import trData from "../../utils/locales/tr/cargo.json";
import { useGlobalContext } from '../../context/globalContext';
import Pagination from '../../utils/paginationTag/pagination';
import LoadingSpinner from '../../utils/spinner/Loading';
import { useLocation } from 'react-router-dom';

export default function Cargo({ language }) {
    const { getCargos, getSingleCargo } = useGlobalContext();
    const [loading, setLoading] = useState(true);
    const [activeModal, setActiveModal] = useState(null);
    const [translation, setTranslations] = useState(enData);
    const [cargos, setCargos] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [singleCargo, setSingleCargo] = useState(null);

    const search = useLocation().search;
    const type = new URLSearchParams(search).get("type") || '';
    const from = new URLSearchParams(search).get("from") || '';
    const to = new URLSearchParams(search).get("to") || '';
    const weight = new URLSearchParams(search).get("weight") || '';
    const openModal = async (id) => {
        try {
            setLoading(true);
            const cargoData = await getSingleCargo(id, language);
            setSingleCargo(cargoData);
            setActiveModal(id);
            setLoading(false);
        } catch (error) {
            console.error(error);
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

    const fetchCargos = async (pageNumber) => {
        try {
            setLoading(true);
            
            console.log(type, from, to,weight);
            let cargoData;
            if (weight > 0) {
                cargoData = await getCargos(pageNumber, language, 10, type, from, to, weight);
            } else {
                cargoData = await getCargos(pageNumber, language, 10, type, from, to, '');
            }
            
            setCargos(cargoData.cargos);
            setPage(cargoData.currentPage);
            setTotalPage(cargoData.totalPages);
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchCargos(page);
        loadTranslations();
    }, [language]);

    const closeModal = () => {
        setActiveModal(null);
        setSingleCargo(null);
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
                {loading ? (
                    <LoadingSpinner />
                ) : cargos.length > 0 ? (
                    cargos.map((cargo) => (
                        <Container key={cargo.uuid} onClick={() => openModal(cargo.uuid)}>
                            <TypePart>{getName(cargo.type, 'name')}</TypePart>
                            <Location>
                                <From>
                                    <img src={globusIcon} alt="" />
                                    <FaArrowRight color='#000' style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }} />
                                    {getName(cargo.from_city, 'name')}, {getName(cargo.from_country, 'name')}
                                </From>
                                <From>
                                    <img src={globusIcon} alt="" />
                                    <FaArrowLeft color='#000' style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }} />
                                    {getName(cargo.to_city, 'name')}, {getName(cargo.to_country, 'name')}
                                </From>
                            </Location>
                            <Properties>
                                <SingleProperty><span>{translation.weight}: </span><p>{cargo.weight}</p> </SingleProperty>
                                <SingleProperty><span>{translation.date}: </span><p>{formatDate(cargo.createdAt)}</p> </SingleProperty>
                            </Properties>
                        </Container>
                    ))
                ) : (
                    <div>No cargos available</div>
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
                                <h3>{singleCargo.cargo.name}</h3>
                            </ModalInfo>
                            <ModalInfo>
                                <span>{translation.modalNumber}</span>
                                <h3>
                                    {singleCargo.cargo.phoneNumber}
                                </h3>
                            </ModalInfo>
                            <ModalInfo>
                                <span>{translation.modalEmail}</span>
                                <h3>
                                    {singleCargo.cargo.email}
                                </h3>
                            </ModalInfo>
                        </ModalContent>
                    </ModalContainer>
                </ModalOverlay>
            )}
            <AddCargo language={language} />
        </>
    );
}
