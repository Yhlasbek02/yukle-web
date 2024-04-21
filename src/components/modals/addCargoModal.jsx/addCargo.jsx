import React, { useEffect, useState, useRef } from 'react'
import { ModalContainer, ModalOverlay, ModalContent, ModalFooter, ModalHeader, ModalBody, ModalCouple, ChildCouple, ModalOption, ModalTextArea } from './style';
import enData from "../../../utils/locales/en/add_cargo.json";
import ruData from "../../../utils/locales/ru/add_cargo.json";
import trData from "../../../utils/locales/tr/add_cargo.json";
export default function AddCargoModal({ onClose, language }) {
    const modalRef = useRef();
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
    useEffect(() => {
        loadTranslations();
    }, [language]);
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
                    <ModalHeader>
                        {translation.title}
                    </ModalHeader>
                    <ModalBody>
                        <label htmlFor="">
                            {translation.type}
                        </label>
                        <select name="" id="">
                            <ModalOption>option</ModalOption>
                        </select>
                        <ModalCouple>
                            <ChildCouple>
                                <label htmlFor="">
                                    {translation.from_country}
                                </label>
                                <select name="" id="" >
                                    <ModalOption>option</ModalOption>
                                </select>
                            </ChildCouple>
                            <ChildCouple style={{ marginLeft: "1rem" }}>
                                <label htmlFor="">
                                    {translation.from_city}
                                </label>
                                <select name="" id="" >
                                    <ModalOption>option</ModalOption>
                                </select>
                            </ChildCouple>

                        </ModalCouple>
                        <ModalCouple>
                            <ChildCouple>
                                <label htmlFor="">
                                    {translation.to_country}
                                </label>
                                <select name="" id="">
                                    <ModalOption>option</ModalOption>
                                </select>
                            </ChildCouple>
                            <ChildCouple style={{ marginLeft: "1rem" }}>
                                <label htmlFor="">
                                    {translation.to_city}
                                </label>
                                <select name="" id="">
                                    <ModalOption>option</ModalOption>
                                </select>
                            </ChildCouple>

                        </ModalCouple>
                        <ModalCouple>
                            <ChildCouple>
                                <label htmlFor="">
                                    {translation.weight}
                                </label>
                                <input type="text" />
                            </ChildCouple>
                            <ChildCouple style={{ marginLeft: "1rem" }}>
                                <label htmlFor="">
                                    {translation.type_transport}
                                </label>
                                <select name="" id="">
                                    <ModalOption value="">option</ModalOption>
                                </select>
                            </ChildCouple>
                        </ModalCouple>

                        <ModalCouple>
                            <ChildCouple>
                                <label htmlFor="">
                                    {translation.name}
                                </label>
                                <input type="text" />
                            </ChildCouple>
                            <ChildCouple style={{ marginLeft: "1rem" }}>
                                <label htmlFor="">
                                    {translation.number}
                                </label>
                                <input type="text" />
                            </ChildCouple>
                        </ModalCouple>
                        <ModalCouple>
                            <ChildCouple>
                                <label htmlFor="">
                                    {translation.email}
                                </label>
                                <input type="text" />
                            </ChildCouple>
                            <ChildCouple style={{ marginLeft: "1rem" }}>
                                <label htmlFor="">
                                    {translation.whatsApp}
                                </label>
                                <input type="text" />
                            </ChildCouple>
                        </ModalCouple>

                        <label htmlFor="">
                            {translation.additional}
                        </label>
                        <ModalTextArea />
                    </ModalBody>
                    <ModalFooter><button>
                        {translation.add}    
                    </button></ModalFooter>
                </ModalContent>
            </ModalContainer>
        </ModalOverlay >
    );
}
