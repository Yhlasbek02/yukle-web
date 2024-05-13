import styled from "styled-components";
export const PaginationContainer = styled.div`
    justify-content: center;
    margin: 1rem;
    display:flex;
    margin-left: 37%;
    align-items: center;
    bottom: 0;
    padding-bottom: 0.5rem;
`
export const Button = styled.button`
    padding: 0.5rem 1rem;
    cursor: pointer;
    background-color: #0075FF;
    color: #fff;
    border: none;
    border-radius: 4px;
    outline: none;
    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }
`
export const Span = styled.span`
    padding: 0 0.5rem;
    margin-top: 1rem;
    font-weight: bold;
    font-size: 1.2rem;
    color: #000;
    margin-bottom: 1rem;
`