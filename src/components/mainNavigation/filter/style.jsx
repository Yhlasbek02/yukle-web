import styled from "styled-components";

export const FilterStyle = styled.div`
    background-color: rgba(79, 36, 0, 0.2);
    padding: 20px;
    width: 90%;
    border-radius: 10px;
    height: 500px;
    justify-content: center;
    align-items: center;
`

export const Text = styled.h3`
    color: ${({ isActive }) => (isActive ? '#4D9FFF' : '#fff')};
    font-size: 18px;
`
export const FormBox = styled.div`
    width: 100%;
    margin: 25px auto;
    position: relative;
    border-radius: 40px;
    padding: 5px;
    background: rgba(255, 255, 255, 0.4);
`;

export const ButtonBox = styled.div`
    position: relative;
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
    color: ${({ isActive }) => (isActive ? '#4D9FFF' : '#fff')};
    z-index: ${({ isActive }) => (isActive ? '1' : 'auto')};
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
`;

export const SwitchButtonContainer = styled.div`
    display: flex;
`;

export const SwitchButtonLabel = styled.span`
    color: #fff;
    flex: 1;
    text-align: center;
`;

export const SwitchButtonWrapper = styled.div`
    display: flex;
    align-items: center;
    width: 100%
`;

export const StyledLabel = styled.label`
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
    color: #fff;
    font-size: 1rem;
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
`