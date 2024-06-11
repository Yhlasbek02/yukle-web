import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const SelectContainer = styled.div`
    margin-left: 85%;
    position: relative;
    display: flex;
    border: 1px solid #4D9FFF;
    border-radius: 20px;
    padding: 10px;
    width: 12%;
    margin-bottom: 10%;
    @media (max-width: 768px) {
        margin-bottom: 5%;
        padding: 7px;
        width: 10%;
    }
    @media (max-width: 426px) {
        width: 14%;
        margin-bottom: 0;
    }
    @media (max-width: 376px) {
        width: 15%;
    }
    @media (max-width: 321px) {
        width: 18%;
        margin-left: 80%;
    }
`;

const SelectedLanguage = styled.span`
    font-size: 1.2rem;
    margin-right: 5px;
    padding-right: 15px;
    color: #4D9FFF;
    @media (max-width: 321px) {
        font-size: 1rem;
    }
`;

const Options = styled.div`
    position: absolute;
    top: calc(100% + 5px);
    left: 0;
    width: 100%;
    background-color: #fff;
    border: 1px solid #4D9FFF;
    border-top: none;
    z-index: 1;
    color: ${props => props.$isOpen ? 'black' : '#4D9FFF'};
    display: ${props => props.$isOpen ? 'block' : 'none'};
    @media (max-width: 321px) {
        font-size: 1rem;
    }
`;

const OptionItem = styled.div`
    color: #4D9FFF;
    padding: 8px;
    font-size: 16px;
    cursor: pointer;
    &:hover {
        background-color: #f0f0f0;
    }
    @media (max-width: 321px) {
        font-size: 14px;
    }
`;

const Icon = styled.span`
  position: relative;
  top: 25%;
  right: 15px;
  transform: translateY(-5px);
  color: #4D9FFF;
  cursor: pointer;
`;

const LanguageSelectForAuth = ({ selectedLanguage, setSelectedLanguage }) => {
    const history = useNavigate();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    const handleLanguageChange = (newLanguage) => {
        setSelectedLanguage(newLanguage);
        const currentPathname = location.pathname;
        const lastSlashIndex = currentPathname.lastIndexOf("/");
        const newPath = currentPathname.substring(0, lastSlashIndex + 1) + newLanguage;
        history(newPath);
        setIsOpen(false);
    };
    

    const handleToggleOptions = () => {
        setIsOpen(prevState => !prevState);
    };

    const capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    return (
        <SelectContainer>
            <SelectedLanguage>{capitalizeFirstLetter(selectedLanguage)}</SelectedLanguage>
            <Options $isOpen={isOpen}>
                <OptionItem onClick={() => handleLanguageChange("en")}>En</OptionItem>
                <OptionItem onClick={() => handleLanguageChange("ru")}>Ru</OptionItem>
                <OptionItem onClick={() => handleLanguageChange("tr")}>Tr</OptionItem>
            </Options>
            <Icon onClick={handleToggleOptions}>{isOpen ? <FiChevronUp /> : <FiChevronDown />}</Icon>
        </SelectContainer>
    );
};

export default LanguageSelectForAuth;
