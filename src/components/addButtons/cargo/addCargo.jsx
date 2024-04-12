import React, {useState} from 'react'
import { IoIosAdd } from "react-icons/io"
import { AddButtonContainer, Button } from '../style'
import AddCargoModal from '../../modals/addCargoModal.jsx/addCargo';

export default function AddCargo() {
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
            {isModalOpen && <AddCargoModal onClose={closeModal} />}
        </>
    )
}
