import React, { useEffect, useRef } from 'react'
import { ModalContainer, ModalOverlay, ModalContent, ModalFooter, ModalHeader, ModalBody, ModalCouple, ChildCouple, ModalOption, ModalTextArea } from './style';
export default function AddCargoModal({ onClose }) {
    const modalRef = useRef();

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [onClose]);

    return (
        <ModalOverlay>
            <ModalContainer ref={modalRef}>
                <ModalContent>
                    <ModalHeader>Application for transport</ModalHeader>
                    <ModalBody>
                        <label htmlFor="">Type of transport</label>
                        <select name="" id="">
                            <ModalOption>option</ModalOption>
                        </select>

                        <label htmlFor="">Affiliation country</label>
                        <select name="" id="">
                            <ModalOption>option</ModalOption>
                        </select>
                        <ModalCouple>
                            <ChildCouple>
                                <label htmlFor="">Location (country)</label>
                                <select name="" id="" >
                                    <ModalOption>option</ModalOption>
                                </select>
                            </ChildCouple>
                            <ChildCouple style={{marginLeft: "1rem"}}>
                                <label htmlFor="">Location (city)</label>
                                <select name="" id="" >
                                    <ModalOption>option</ModalOption>
                                </select>
                            </ChildCouple>
                        </ModalCouple>

                        <label htmlFor="">Desired direction</label>
                        <select name="" id="">
                            <ModalOption>option</ModalOption>
                        </select>

                        <ModalCouple>
                            <ChildCouple>
                                <label htmlFor="">Name</label>
                                <input type="text" />
                            </ChildCouple>
                            <ChildCouple style={{marginLeft: "1rem"}}>
                                <label htmlFor="">Mobile number</label>
                                <input type="text" />
                            </ChildCouple>
                        </ModalCouple>
                        <ModalCouple>
                            <ChildCouple>
                                <label htmlFor="">Email</label>
                                <input type="text" />
                            </ChildCouple>
                            <ChildCouple style={{marginLeft: "1rem"}}>
                                <label htmlFor="">WhatsApp</label>
                                <input type="text" />
                            </ChildCouple>
                        </ModalCouple>

                        <label htmlFor="">Additional information (optional)</label>
                        <ModalTextArea />
                    </ModalBody>
                    <ModalFooter><button>Send</button></ModalFooter>
                </ModalContent>
            </ModalContainer>
        </ModalOverlay >
    );
}
