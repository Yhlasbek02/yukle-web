import React, { useEffect, useState, useRef } from 'react';
import {
    ModalContainer,
    ModalOverlay,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalBody,
    ModalTextArea,
    CloseButton
} from './style';
import enData from "../../utils/locales/en/support.json";
import ruData from "../../utils/locales/ru/support.json";
import trData from "../../utils/locales/tr/support.json";
import { useGlobalContext } from '../../context/globalContext';

const ChatModal = ({ onClose, language }) => {
    const modalRef = useRef();
    const { getMessages, addMessage } = useGlobalContext();
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [translation, setTranslations] = useState(enData);
    const [page, setPage] = useState(1);
    const [text, setText] = useState('');
    const loadTranslations = () => {
        const translations = {
            'en': enData,
            'ru': ruData,
            'tr': trData
        };
        setTranslations(translations[language] || enData);
    };

    const fetchMessages = async (pageNumber) => {
        try {
            const response = await getMessages(pageNumber, language);
            const apiMessages = response.messages.flatMap(msg => [
                { id: msg.id, sender: 'user', text: msg.text, timestamp: msg.createdAt },
                ...msg.user_message.map(um => ({ id: um.id, sender: 'admin', text: um.text, timestamp: um.createdAt }))
            ]);
            setMessages(apiMessages);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSendMessage = async () => {
        if (message.trim()) {
            const newMessage = { sender: 'user', text: message.trim(), timestamp: new Date().toISOString() };
            setMessages([...messages, newMessage]);
            await addMessage(message, language)
            setMessage('');

            // Simulate admin response
            // setTimeout(() => {
            //     const adminMessage = { sender: 'admin', text: 'This is an auto-response from the admin.', timestamp: new Date().toISOString() };
            //     setMessages(prevMessages => [...prevMessages, adminMessage]);
            // }, 1000);
        }
    };

    useEffect(() => {
        loadTranslations();
        fetchMessages(page, language);
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
                        <span>
                            {translation.title}
                        </span>

                        <CloseButton onClick={onClose}>&times;</CloseButton>
                    </ModalHeader>
                    <ModalBody>
                        <div style={{ height: '300px', overflowY: 'auto', marginBottom: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '10px' }}>
                            {messages.map((msg, index) => (
                                <div key={index} style={{ textAlign: msg.sender === 'admin' ? 'left' : 'right' }}>
                                    <p style={{ backgroundColor: msg.sender === 'admin' ? '#f1f1f1' : '#4D9FFF', color: msg.sender === 'admin' ? '#000' : '#fff', display: 'inline-block', borderRadius: '10px', padding: '5px 10px', margin: '5px 0' }}>
                                        {msg.text}
                                    </p>
                                </div>
                            ))}
                        </div>
                        <ModalTextArea value={message} onChange={(e) => setMessage(e.target.value)} placeholder={translation.placeholder} />
                    </ModalBody>
                    <ModalFooter>
                        <button type="button" onClick={handleSendMessage}>{translation.button}</button>
                    </ModalFooter>
                </ModalContent>
            </ModalContainer>
        </ModalOverlay>
    );
};

export default ChatModal;
