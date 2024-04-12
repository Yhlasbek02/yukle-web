import styled from "styled-components";


export const FormBox = styled.div`
    width: 35%;
    padding: 5px;
    margin: 25px auto;
    position: relative;
    justify-content: center;
    align-items: center;
    border-radius: 30px;
    background: #4D9FFF;
`;

export const ButtonBox = styled.div`
    position: relative;
`;

export const ToggleButton = styled.button`
    padding: 10px 25px;
    cursor: pointer;
    background: transparent;
    border: 0;
    width: 50%;
    outline: none;
    font-size: 1rem;
    position: relative;
    justify-content: center;
    align-items: center;
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
    // padding: 10px;
    margin: 10px;
`;

export const SwitchButtonLabel = styled.span`
    color: #fff;
    padding: 10px;
    flex: 1;
    text-align: center;
`;

export const SwitchButtonWrapper = styled.div`
    display: flex;
    align-items: center;
    width: 100%
`;

