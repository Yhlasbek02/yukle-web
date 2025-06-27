import React, { useState, useRef, useEffect, useCallback } from 'react';
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
import SupportButton from '../supportButton/supportButton';

function Cargo({ language }) {
    const { getCargos, getSingleCargo } = useGlobalContext();
    const [loading, setLoading] = useState(true);
    const [activeModal, setActiveModal] = useState(null);
    const [translation, setTranslation] = useState(enData);
    const [cargos, setCargos] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [singleCargo, setSingleCargo] = useState(null);

    const search = useLocation().search;

    const loadTranslations = useCallback(() => {
        const translations = {
            'en': enData,
            'ru': ruData,
            'tr': trData,
        };
        setTranslation(translations[language] || enData);
    }, [language]);

    const fetchCargos = useCallback(async () => {
        setLoading(true);
        try {
            const searchParams = new URLSearchParams(search);
            const type = searchParams.get("type") || '';
            const from = searchParams.get("from") || '';
            const to = searchParams.get("to") || '';
            const weight = searchParams.get("weight") || '';

            const cargoData = await getCargos(page, language, 10, type, from, to, weight);
            setCargos(cargoData.cargos);
            setPage(cargoData.currentPage);
            setTotalPage(cargoData.totalPages);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, [getCargos, language, search]);

    useEffect(() => {
        fetchCargos(page);
        loadTranslations();
    }, [language, search, page, fetchCargos, loadTranslations]);

    const openModal = useCallback(async (id) => {
        setLoading(true);
        try {
            const cargoData = await getSingleCargo(id, language);
            setSingleCargo(cargoData);
            setActiveModal(id);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, [getSingleCargo, language]);

    const closeModal = useCallback(() => {
        setActiveModal(null);
        setSingleCargo(null);
    }, []);

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

    const getName = useCallback((cargo, name) => {
        switch (language) {
            case 'ru':
                return cargo[`${name}Ru`];
            case 'tr':
                return cargo[`${name}Tr`];
            default:
                return cargo[`${name}En`];
        }
    }, [language]);

    const formatDate = useCallback((dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    }, []);

    const handlePrevPage = useCallback(() => {
        if (page > 1) {
            fetchCargos(page - 1);
        }
    }, [page, fetchCargos]);

    const handleNextPage = useCallback(() => {
        if (page < totalPage) {
            fetchCargos(page + 1);
        }
    }, [page, totalPage, fetchCargos]);

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
                                    {cargo.from_city ? getName(cargo.from_city, 'name') : ''}, {getName(cargo.from_country, 'name')}
                                </From>
                                <From>
                                    <img src={globusIcon} alt="" />
                                    <FaArrowLeft color='#000' style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }} />
                                    {cargo.to_city ? getName(cargo.to_city, 'name') : ''}, {getName(cargo.to_country, 'name')}
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
                ) : null}
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
                                <h3>{singleCargo?.cargo.name}</h3>
                            </ModalInfo>
                            <ModalInfo>
                                <span>{translation.modalNumber}</span>
                                <h3>
                                    {singleCargo?.cargo.phoneNumber}
                                </h3>
                            </ModalInfo>
                            <ModalInfo>
                                <span>{translation.modalEmail}</span>
                                <h3>
                                    {singleCargo?.cargo.email}
                                </h3>
                            </ModalInfo>
                        </ModalContent>
                    </ModalContainer>
                </ModalOverlay>
            )}
            <SupportButton language={language} />
            <AddCargo language={language} />
        </>
    );
}

export default React.memo(Cargo);
