import styled from "styled-components";

export const AddButtonContainer = styled.div`
    position: fixed;
    bottom: 0; /* Adjust as needed */
    right: 1rem; /* Adjust as needed */
    transform: translateY(-50%);
    z-index: 999; /* Ensure it's above other content */
`


export const Button = styled.button`
    border-radius: 50%;
    justify-content: center;
    background-color: #0075FF;
    border: 1px solid #0075FF;
    border: none;
    width: 65px;
    height: 65px;
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #005dbb;
    }
`