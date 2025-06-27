import React, {useState} from 'react'
// import { IoMdChatboxes } from 'react-icons/io';
import { AddButtonContainer, Button } from './style'
import { TbMessageCircleQuestion } from "react-icons/tb";
import ChatModal from '../chatModal/chatModal';

export default function SupportButton({language}) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <AddButtonContainer>
                <Button onClick={openModal}>
                    <TbMessageCircleQuestion size={35} color="white" />
                </Button>
            </AddButtonContainer>
            {isModalOpen && <ChatModal onClose={closeModal} language={language} />}
        </>
    )
}
