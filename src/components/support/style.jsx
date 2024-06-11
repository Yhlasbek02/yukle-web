import styled from "styled-components";

export const Title = styled.h3`
    font-size: 1.8rem;
    color: #fff;
    font-weight: 600;
    margin-top: 1rem;
    padding-left: 25%;
    font-family: Arial;
`

export const Body = styled.div`
    padding: 0.5rem;
    width: 100%;
`

export const SendContainer = styled.div`
    position: absolute;
    display: flex;
    width: 95%;
    margin-top: 100%;
`

export const Messages = styled.div`
    padding: 1rem;
    margin-top: 2rem;
`

export const Input = styled.input`
    color: #4D9FFF;
    width: 90%;
    padding: 12px 40px 12px 12px;
    font-size: 16px;
    margin-right: 0.5rem;
    border: 1px solid #4D9FFF;
    border-radius: 10px;
    outline: none;
    transition: border-color 0.3s;
    box-sizing: border-box;
`

export const AdminMessage = styled.div`
    width: 3rem;
    height: 30%;
    background-color: rgba(77, 159, 255, 0.05);
`