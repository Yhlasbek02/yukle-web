import styled from 'styled-components';

export const Window = styled.div`
    width: 100%;
    flex-wrap: wrap;
    justify-content: center;
`;

export const Title = styled.h3`
    font-size: 3rem;
    color: #4D9FFF;
    text-align: center;
    font-weight: 800;
    margin-bottom: 1.2rem;
    padding-left: 43%;
    @media (max-width: 768px) {
        color: #fff;
        font-size: 2.5rem;
        padding-left: 35%;
    }
    @media (max-width: 426px) {
        margin-left: 0;
    }
`;

export const Buttons = styled.div`
    display: flex;
    padding-top: 1.3rem;
    gap: 1rem;
`;

export const FirstLine = styled.div`
    display: flex;
    justify-content: space-between;
    padding-right: 1rem;
    @media (max-width: 768px) {
        display: none;
    }
`;

export const LogOut = styled.button`
    border-radius: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    width: 5rem;
    font-size: 1rem;
    cursor: pointer;
    height: 2.5rem;
    background-color: #fff;
    border: 2px solid #4D9FFF;
    color: #4D9FFF;
    white-space: nowrap;
    &:hover {
        background-color: #e0e0ff;
        border-color: #388eff;
        transition: background-color 0.2s ease-in-out, border-color 0.2s ease-in-out;
    }
    @media (max-width: 426px) {
        border-radius: 50%;
        justify-content: center;
        background-color: #0075FF;
        border: 1px solid #0075FF;
        border: none;
        width: 65px;
        height: 65px;
        margin-right: 1.5rem;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        transition: background-color 0.3s ease;

        &:hover {
            background-color: #005dbb;
        }
        
        &:focus {
            outline: none;
        }
    }
`;

export const Delete = styled(LogOut)`
    border-color: #FF584D;
    color: #FF584D;
    padding: 10px;
    text-align: center;
    &:hover {
        background-color: #ffe0e0;
        border-color: #d62728;
    }
`;

export const SecondLine = styled.div`
    justify-content: center;
    align-items: center;
`
export const Line = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    @media (min-width: 1024px) {
        #mobile {
            display: none;
        }
    }
    @media (max-width: 769px) {
        #desktop {
            display: none;
        }
    }
`

export const SingleInfo = styled.div`
    border: 1px solid #0075FF;
    border-radius: 20px;
    background-color: rgba(77, 159, 255, 0.05);
    padding: 10px;
    width: 45%;
    margin: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    span {
        font-size: 0.8rem;
        padding-left: 3px;
    }
    h3 {
        font-size: 1.4rem;
        color: #0075ff;
        padding-left: 3px;
    }
    label {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        color: #4D9FFF;
    }
    

    input[type="checkbox"] {
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        display: inline-block;
        width: 20px;
        height: 20px;
        margin: 0;
        border: 2px solid #4D9FFF;
        border-radius: 4px;
        background-color: #fff;
        cursor: pointer;
        position: relative;
    }

    select {
        width: 100%;
        padding-bottom: 5px;
        border: none;
        background: transparent;
        color: #0075ff;
        font-weight: 600;
        font-size: 1.2rem;
    }
        
    select:focus {
        outline: none;
    }
    input[type="checkbox"]:checked {
        background-color: #4D9FFF;
        border-color: #4D9FFF;
    }

    input[type="checkbox"]:checked::after {
        content: '';
        position: absolute;
        width: 4.5px;
        height: 10px;
        border: solid #fff;
        border-width: 0 2px 2px 0;
        top: 2px;
        left: 5px;
        transform: rotate(45deg);
    }

    @media (max-width: 426px) {
        width: 100%;
        margin: 0.5rem;
        gap: 0;
        span {
            padding-bottom: 5px;
        }
        h3 {
            font-size: 1rem;
        }
        select {
            font-size: 1rem;
        }
    }
`

export const SecondInfo = styled(SingleInfo)`
    width: 90%;
`;


export const ThirdInfo = styled.div`
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
    @media (max-width: 426px) {
        display: none;
    }
`
export const SupportTitle = styled.h2`
    font-size: 2.5rem;
    color: #4D9FFF;
    text-align: center;
    font-weight: 800;
    margin-bottom: 1.2rem;
`

export const TextArea = styled.textarea.attrs({
    required: true
})`
    border: 1px solid #0075FF;
    background-color: rgba(77, 159, 255, 0.05);
    border-radius: 20px;
    padding: 10px;
    width: 55%;
    height: 10rem;
    font-size: 1rem;
    color: #0075ff;
    justify-content: center;
    align-items: center;
    margin-left: 20%;    
    &::placeholder {
        color: #4D9FFF;
        opacity: 1;
    }
    
    @media (max-width: 769px) {
        height: 7rem;
    }
`

export const Button = styled.button`
    border-radius: 15px;
    margin-top: 1rem;
    justify-content: center;
    align-items: center;
    text-aling: center;
    padding: 15px 35px;
    font-size: 1.1rem;
    width: 15%;
    font-weight: 700;
    cursor: pointer;
    background-color: #4D9FFF;
    border:none;
    color: #fff;
    margin-left: 40%;
    &:hover {
        background-color: #fff;
        border: 2px solid #4D9FFF;
        color:#4D9FFF;
        font-weight: 700;
        transition: background-color 0.2s ease-in-out, border-color 0.2s ease-in-out;
    }
`


export const MobileButton = styled.button`
    border-radius: 30px;
    width: 33%;
    height: 4rem;
    // margin-top: 1rem;
    justify-content: center;
    align-items: center;
    text-aling: center;
    padding: 10px 15px;
    margin-left: 5px;
    font-size: 1rem;
    // width: 15%;
    font-weight: 700;
    cursor: pointer;
    background-color: #4D9FFF;
    border:none;
    color: #fff;
    &:hover {
        background-color: #fff;
        border: 2px solid #4D9FFF;
        color:#4D9FFF;
        font-weight: 700;
        transition: background-color 0.2s ease-in-out, border-color 0.2s ease-in-out;
    }
`

export const ModalBackdrop = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    z-index: 1000;
`;

export const ModalContent = styled.div`
    background: white;
    padding: 2rem;
    border-radius: 10px;
    max-width: 500px;
    width: 100%;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
`;

export const ModalTitle = styled.h2`
    margin-bottom: 1rem;
`;

export const ModalButtons = styled.div`
    margin-top: 1rem;
    display: flex;
    justify-content: center;
    gap: 1rem;
`;

export const ModalButton = styled.button`
    padding: 0.5rem 2rem;
    border: none;
    font-size: 1.2rem;
    border-radius: 10px;
    cursor: pointer;

    &:first-of-type {
        border: 1.5px solid #4d9fff;
        background-color: #4D9FFF;
        color: white;
        &:hover {
            background-color: #fff;
            border-color: #388eff;
            color: #4D9FFF;
        }
    }

    &:last-of-type {
        border: 1.5px solid #FF584D;
        background-color: #FF584D;
        color: #fff;
        &:hover {
            background-color: #fff;
            color: #FF584D;
        }
    }
`;

export const InputField = styled.input`
    border: 1px solid #0075FF;
    border-radius: 10px;
    padding: 0.5rem;
    margin-bottom: 1rem;
    width: 100%;
    font-size: 1.3rem;
    color: #0075ff;

    &::placeholder {
        color: #4D9FFF;
        opacity: 1;
    }
`;

export const MobileButtons = styled.div`
    margin-top: 2rem;
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 95%;
`;