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
    justify-content: flex-end; /* Align items to the right */
    .right {
        width: 90%;
        height: 100vh; /* Set height to match window height */
        overflow-y: auto; /* Add vertical scroll if content exceeds window height */
    }
    .left: {
        width: 300px;
    }
`;

export const Right = styled.div`
    width: 90%;
    height: 100vh; /* Set height to match window height */
    overflow-y: auto;
`

export const Left = styled.div`
    width: 600px;
    height: 100vh;
`