import styled from "styled-components";
import back from "../assets/sidebarBack.svg";
export const AuthStyle = styled.div`
    display: flex;
    margin: 0;
    padding: 0;
    background: url(${back});
    background-size: cover;
    background-position: center;
    width: 100%;
    height: 100vh;
    justify-content: flex-end;
    @media (max-width: 768px) { /* Adjust the max-width for tablet screens */
        background: none; /* Remove background image */
    }
`;

export const Right = styled.div`
    width: 90%;
    height: 100vh;
    overflow-y: auto;
    @media (max-width: 768px) {
        display: none;
    }
`

export const Left = styled.div`
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    
`