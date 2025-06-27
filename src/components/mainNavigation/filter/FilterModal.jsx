import React from 'react';
import { ModalOverlay, ModalContainer, CloseButton } from './style';
import Filter from './Filter';

const FilterModal = ({ isModalOpen, setIsModalOpen, language, isRight, setIsRight }) => {
    if (!isModalOpen) return null;
    return (
        <ModalOverlay isOpen={isModalOpen}>
            <ModalContainer>
                <CloseButton onClick={() => setIsModalOpen(false)}>&times;</CloseButton>
                <Filter language={language} isRight={isRight} setIsRight={setIsRight} setIsModalOpen={setIsModalOpen} />
            </ModalContainer>
        </ModalOverlay>
    );
};

export default FilterModal;
