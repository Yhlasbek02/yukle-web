import styled from "styled-components";

export const FilterStyle = styled.div`
    background-color: rgba(79, 36, 0, 0.2);
    padding: 20px;
    width: 90%;
    border-radius: 10px;
    height: 500px;
    justify-content: center;
    align-items: center;
    @media (max-width: 769px) {
        background-color: #fff;
        padding: 5px;
        width: 100%;
    }
`

export const Text = styled.h3`
    color: ${({ $isActive }) => ($isActive ? '#4D9FFF' : '#fff')};
    font-size: 18px;
    @media (max-width: 769px) {
        color: #4D9FFF;
        font-size: 20px;
    }
`
export const FormBox = styled.div`
    width: 100%;
    margin: 25px auto;
    position: relative;
    border-radius: 40px;
    padding: 5px;
    background: rgba(255, 255, 255, 0.4);
    @media (max-width: 769px){
        margin: 20px 0;
    }
`;

export const ButtonBox = styled.div`
    position: relative;
    @media (max-width: 769px) {
        border: 1px solid #4D9FFF;
        border-radius: 40px;
    }
`;

export const ToggleButton = styled.button`
    padding: 8px 10px;
    cursor: pointer;
    background: transparent;
    border: 0;
    width: 50%;
    outline: none;
    font-size: 1rem;
    position: relative;
    text-align: center;
    color: ${({ $isActive }) => ($isActive ? '#4D9FFF' : '#fff')};
    z-index: ${({ $isActive }) => ($isActive ? '1' : 'auto')};
    @media (max-width: 769px) {
        color: ${({ $isActive }) => ($isActive ? '#fff' : '#4D9FFF')};
        z-index: ${({ $isActive }) => ($isActive ? '1' : 'auto')};
    }
`;

export const SwitchButton = styled.div`
    position: absolute;
    top: 0;
    left: ${({ isRight }) => isRight ? '50%' : '0'};
    width: 50%;
    height: 100%;
    background: #fff;
    border-radius: 30px;
    transition: .5s;
    padding: 1rem;
    @media (max-width: 769px) {
        background: #4D9FFF;
        left: ${({ isRight }) => (isRight ? '50%' : '0')};
        
    }
`;

export const SwitchButtonContainer = styled.div`
    display: flex;
`;

export const SwitchButtonLabel = styled.span`
    color: #fff;
    flex: 1;
    text-align: center;
    @media (max-width: 769px) {
        color: #4D9FFF;
    }
`;

export const SwitchButtonWrapper = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    
`;

export const StyledLabel = styled.label`
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
    color: #fff;
    font-size: 1rem;
    @media (max-width: 769px) {
        color: #4D9FFF;
        text-align: left;
        margin-left: 0.5rem;
    }
`;

export const StyledSelect = styled.select`
    width: 100%;
    padding: 10px;
    color: #fff;
    margin-bottom: 10px;
    border: 1px solid #fff;
    border-radius: 15px;
    background: transparent;
    option {
        color:#000;
    }
    @media (max-width: 769px) {
        color: #4D9FFF;
        border: 1px solid #4D9FFF;
    }
    
`;

export const StyledInput = styled.input`
    width: 100%;
    padding: 8px;
    font-size: 1rem;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 15px;
    background: transparent;
    color: #fff;
    @media (max-width: 769px) {
        color: #4D9FFF;
        border: 1px solid #4D9FFF;
    }
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        appearance: none;
        margin: 0;
    }
`;

export const ButtonContainer = styled.div`
    width: 100%;
    padding: 1rem;
    justify-content: center;
    align-items: center;
`

export const SearchButton = styled.button`
    background: #fff;
    font-size: 1.3rem;
    color: #4D9FFF;
    border-radius: 30px;
    font-weight: 700;
    outline: none;
    border: 1px solid #fff;
    padding: 10px;
    margin-left: 2.5rem;
    width: 70%;
    @media (max-width: 769px) {
        border: 1px solid #4D9FFF;
        background: #4D9FFF;
        color: #fff;
        margin-left: 0;
    }
`

export const ModalOption = styled.option`
    font-size: 1rem;
    background-color: #fff;
    color: #4D9FFF;
    padding: 15px;
`

export const ModalOverlay = styled.div`
    @media (min-width: 770px) {
        display: none
    }
    display: ${props => (props.isOpen ? 'block' : 'none')};
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    text-align: center;
    z-index: 9999;
`;

export const ModalContainer = styled.div`
    background-color: white;
    border-radius: 8px;
    padding: 20px;
    width: 35%;
    height: 96%;
    margin-top: 0.5rem;
    overflow-y: auto;
    @media (max-width: 769px) {
        width: 60%;
    }
    @media (max-width: 426px) {
        margin-top: 0.5rem;
        width: 90%;
    }
    @media (max-width: 376px) {
        width: 90%;
        margin-top: 0.5rem;
    }
    @media (max-height: 320px) {
        width: 90%;
        margin-top: 0.5rem;
    }
`;


export const ModalContent = styled.div`
  padding: 20px;

  // Adjust padding for smaller screens
  @media (max-width: 600px) {
    padding: 15px;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 16px;
  cursor: pointer;

  // Adjust font size for smaller screens
  @media (max-width: 600px) {
    top: 5px;
    right: 5px;
    font-size: 14px;
  }
`;
