import React, { useState, useRef, useEffect } from 'react'
import { Container, TypePart, From, Location, Properties, SingleProperty, Window, ModalOverlay, ModalContainer, ModalContent, ModalTitle, ModalInfo } from '../transportContainer/style'
import { FaArrowLeft } from "react-icons/fa"
import globusIcon from "../../assets/globus_1.svg"
import AddTransport from '../addButtons/transport/addTransport'


export default function TransportNotifications() {
    const [activeModal, setActiveModal] = useState(null);

    const openModal = (containerIndex) => {
        setActiveModal(containerIndex);
    };

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
                            <SingleProperty><span>Date: </span><p>date</p> </SingleProperty>
                        </Properties>
                    </Container>
                ))}
            </Window>
            {activeModal !== null && (
                <ModalOverlay>
                    <ModalContainer ref={modalRef}>
                        <ModalContent>
                            <ModalTitle>
                                <p>Transport</p>
                            </ModalTitle>
                            <ModalInfo>
                                <span>Name</span>
                                <h3>Name of user</h3>
                            </ModalInfo>
                            <ModalInfo>
                                <span>Mobile number</span>
                                <h3>Mobile number of user</h3>
                            </ModalInfo>
                            <ModalInfo>
                                <span>Email</span>
                                <h3>Email of user</h3>
                            </ModalInfo>
                        </ModalContent>
                    </ModalContainer>
                </ModalOverlay>
            )}
            <AddTransport />
        </>


    )
}
