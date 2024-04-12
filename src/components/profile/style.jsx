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
    padding-left: 40%;
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
`;

export const LogOut = styled.button`
    border-radius: 30px;
    align-items: flex-start;
    justify-content: center;
    padding: 10px 35px;
    width: 50%;
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
`;

export const Delete = styled(LogOut)`
    border-color: #FF584D;
    color: #FF584D;
    padding: 10px 20px;
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
`

export const SingleInfo = styled.div`
    border: 1px solid #0075FF;
    border-radius: 20px;
    background-color: rgba(77, 159, 255, 0.05);
    padding: 10px;
    width: 30%;
    margin: 1rem;
    span {
        font-size: 0.8rem;
    }
    h3 {
        font-size: 1.2rem;
        color: #0075ff;
    }
`

export const ThirdInfo = styled.div`
    justify-content: center;
    margin-top: 1rem;
`
export const SupportTitle = styled.h2`
    font-size: 2.5rem;
    color: #4D9FFF;
    text-align: center;
    font-weight: 800;
    margin-bottom: 1.2rem;
`

export const TextArea = styled.textarea`
    border: 1px solid #0075FF;
    background-color: rgba(77, 159, 255, 0.05);
    border-radius: 20px;
    padding: 10px;
    width: 50%;
    height: 15rem;
    font-size: 1rem;
    color: #0075ff;
`

export const Button = styled.button`
    border-radius: 15px;
    margin-top: 1rem;
    justify-content: center;
    align-items: center;
    text-aling: center;
    padding: 15px 35px;
    font-size: 1.1rem;
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