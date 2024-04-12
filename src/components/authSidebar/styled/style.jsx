import styled from "styled-components";

export const Style = styled.div`
    width: 50%;
    margin-top: 30%;
    padding: 50px; /* Added padding for better spacing */
    box-sizing: border-box; /* Ensuring padding doesn't increase the width */
    display: flex; /* Added flex display */
    justify-content: space-between; /* Added space between items */

    .text {
        flex-grow: 1; /* Allow the text div to grow to fill available space */
    }

    h1 {
        color: #fff;
        font-size: 4.5rem;
        font-weight: 800;
        margin-bottom: 20px; /* Added margin bottom for spacing */
    }

    h3 {
        font-size: 1.2rem;
        color: #fff;
        font-weight: 400;
        line-height: 1.5; /* Adjusted line height for better readability */
    }
`