import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        list-style: none;
    }

    body {
        font-family: 'Nunito', sans-serif;
        font-size: clamp(1rem, 1.5vw, 1.2rem);
        color: rgba(34, 34, 96, 0.6);
        margin: 0;
        padding: 0;
    }

    .error {
        color: red;
        animation: shake 0.5s ease-in-out;
    }
`;
