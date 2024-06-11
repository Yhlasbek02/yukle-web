import styled from "styled-components";
import background from "../../assets/mobile_left.svg"

export const MobileContainer = styled.div`
    display: block;
    box-sizing: border-box;
    background-image: url(${background});
    background-repeat: no-repeat, repeat;
    background-position: center;
    height: 180px;
    width: 100%;
    padding-top: 1rem;
    padding-bottom: 1rem;
    border-radius: 0px 0px 40px 40px;
    @media (min-width: 769px) {
        display: none;
        padding: 0;
    }
`


export const Mobile = styled.div`
    display: flex;
    box-sizing: border-box;
    background-image: url(${background});
    background-repeat: no-repeat, repeat;
    background-position: center;
    height: 100px;
    text-align: center;
    width: 100%;
    padding-top: 1rem;
    padding-bottom: 1rem;
    border-radius: 0px 0px 40px 40px;
    @media (min-width: 769px) {
        padding-top: 0.5rem;
        padding-bottom: 0;
        background: #fff;
    }
`

export const ProfileMobile = styled.div`
    display: flex;
    box-sizing: border-box;
    background-image: url(${background});
    background-repeat: no-repeat, repeat;
    background-position: center;
    height: 100px;
    text-align: center;
    width: 100%;
    padding-top: 1rem;
    padding-bottom: 1rem;
    border-radius: 0px 0px 40px 40px;
    @media (min-width: 769px) {
        display: none;
    }
`

export const DesktopContainer = styled.div`
    display: block;
    @media (max-width: 769px) {
        display: none;
    }
`


export const FormBox = styled.div`
    width: 45%;
    padding: 5px;
    margin: 25px auto;
    position: relative;
    justify-content: center;
    align-items: center;
    border-radius: 30px;
    background: #4D9FFF;
    @media (max-width: 1024px) {
        width: 50%;
    }
    @media (max-width: 768px) {
        width: 55%;
        background: rgba(255, 255, 255, 0.4);
    }
    @media (max-width: 480px) {
        width: 90%; 
    }
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
    color: ${({ $isActive }) => ($isActive ? '#4D9FFF' : '#fff')};
    z-index: ${({ $isActive }) => ($isActive ? '1' : 'auto')};
    @media (max-width: 768px) {
        padding: 7px 20px;
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

export const MobileProfile = styled.div`
    margin-top: 10px;
    display: flex;
    margin-left: 5rem;
`

export const Text = styled.div`
    padding-right: 70%;
    @media (max-width: 426px) {
        padding-right: 40%;
        h4 {
            font-weight: 100;
        }
        h4, h3 {
            font-size: 1rem;
            color: #fff;
        }
    }
    h4 {
        font-weight: 200;
    }
    h4, h3 {
        font-size: 1.2rem;
        color: #fff;
    }
    
`