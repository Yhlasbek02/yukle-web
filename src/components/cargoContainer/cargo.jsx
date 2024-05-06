import React, { useState, useRef, useEffect } from 'react'
import { Container, TypePart, From, Location, Properties, SingleProperty, Window, ModalOverlay, ModalContainer, ModalContent, ModalTitle, ModalInfo } from './style'
import globusIcon from "../../assets/globus_1.svg"
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"
import AddCargo from '../addButtons/cargo/addCargo'
import enData from "../../utils/locales/en/cargo.json";
import ruData from "../../utils/locales/ru/cargo.json";
import trData from "../../utils/locales/tr/cargo.json";
import { useGlobalContext } from '../../context/globalContext'
import Pagination from '../../utils/paginationTag/pagination'
export default function Cargo({ language }) {
    const { getCargos } = useGlobalContext()
    const [activeModal, setActiveModal] = useState(null);
    const [translation, setTranslations] = useState(enData);
    const [cargos, setCargos] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [singleCargoId, setSingleCargoId] = useState(null);
    const openModal = (containerIndexd) => {
        setActiveModal(containerIndex);
    };
    const loadTranslations = () => {
        const translations = {
            'en': enData,
            'ru': ruData,
            'tr': trData
        };
        setTranslations(translations[language] || enData);
    };

    const fetchCargos = async () => {
        try {
            const cargoData = await getCargos(page, language);
            setCargos(cargoData.cargos);
            setPage(cargoData.currentPage);
            setTotalPage(cargoData.totalPages);
            console.log(cargos);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchCargos();
        loadTranslations();
    }, [language]);
    const closeModal = () => {
        setActiveModal(null);
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

    return (
        <>
            <Window>
                {cargos.length > 0 ? (
                    cargos.map((cargo) => (
                        <Container key={cargo.uuid} onClick={() => openModal(cargo.uuid)}>
                            <TypePart>{cargo.type.nameEn || ''}</TypePart>
                            <Location>
                                <From>
                                    <img src={globusIcon} alt="" />
                                    <FaArrowRight color='#000' style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }} />
                                    {cargo.uuid}
                                </From>
                                <From>
                                    <img src={globusIcon} alt="" />
                                    <FaArrowLeft color='#000' style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }} />
                                    {cargo.uuid}
                                </From>
                            </Location>
                            <Properties>
                                <SingleProperty><span>{translation.weight}: </span><p>{cargo.weight}</p> </SingleProperty>
                                <SingleProperty><span>{translation.date}: </span><p>{cargo.date}</p> </SingleProperty>
                            </Properties>
                        </Container>
                    ))
                ) : (
                    <div>No cargos available</div>
                )}


                {/* {Array().fill().map((cargo) => (
                    <Container key={cargo} onClick={() => openModal(cargo.uuid)}>
                        <TypePart>Cargo type</TypePart>
                        <Location>
                            <From>
                                <img src={globusIcon} alt="" /><FaArrowRight color='#000' style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }} /> city, country <br />
                            </From>
                            <From>
                                <img src={globusIcon} alt="" /><FaArrowLeft color='#000' style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }} /> city, country
                            </From>
                        </Location>
                        <Properties>
                            <SingleProperty><span>{translation.weight}: </span><p>1 tonne</p> </SingleProperty>
                            <SingleProperty><span>{translation.date}: </span><p>date</p> </SingleProperty>
                        </Properties>

                    </Container>
                ))} */}
                <Pagination currentPage={page} totalPages={totalPage} />

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
