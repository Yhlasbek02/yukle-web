import React, {useState, useRef} from 'react'
import { IoIosAdd } from "react-icons/io"
import { AddButtonContainer, Button } from '../style'
import AddTransportModal from '../../modals/addTransportModal.jsx/addTransport';
export default function AddTransport() {
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
                    <IoIosAdd size={40} color='white' />
                </Button>
            </AddButtonContainer>
            {isModalOpen && <AddTransportModal onClose={closeModal} />}
        </>

    )
}
