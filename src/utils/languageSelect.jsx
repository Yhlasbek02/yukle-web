import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const SelectContainer = styled.div`
    position: relative;
    display: inline-block;
`;

const SelectedLanguage = styled.span`
  font-size: 1.2rem;
  margin-right: 5px;
  padding-right: 15px;
`;

const Options = styled.div`
    position: absolute;
    top: calc(100% + 5px);
    left: 0;
    width: 100%;
    background-color: #fff;
    border: 1px solid #ccc;
    border-top: none;
    z-index: 1;
    color: ${props => props.$isOpen ? 'black' : '#fff'};
    display: ${props => props.$isOpen ? 'block' : 'none'};
`;

const OptionItem = styled.div`
    padding: 8px;
    font-size: 16px;
    cursor: pointer;
    &:hover {
        background-color: #f0f0f0;
    }
`;

const Icon = styled.span`
  position: relative; /* Enable relative positioning */
  top: 20%; /* Adjust top position if needed */
  right: 15px; /* Adjust space between the select and the icon */
  /* Adjust transform value for finer control */
  transform: translateY(-5px); /* Move icon slightly down */
  color: #fff; /* Adjust icon color */
  cursor: pointer;
`;

const LanguageSelect = ({ selectedLanguage, setSelectedLanguage }) => {
    const history = useNavigate();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    const handleLanguageChange = (newLanguage) => {
        setSelectedLanguage(newLanguage);
        localStorage.setItem('selectedLanguage', newLanguage);
        const currentPathname = location.pathname;
        const newPath = currentPathname.replace(/\/(en|ru|tr)$/, `/${newLanguage}`);
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

export default LanguageSelect;
