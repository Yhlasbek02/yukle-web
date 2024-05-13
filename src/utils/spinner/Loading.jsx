import React from "react";
import styled, { keyframes } from "styled-components";

const spinAnimation = keyframes`
    to {
        transform: rotate(360deg);
    }
`

const Spinner = styled.div`
  border: 4px solid #3498db; /* Blue color */
  border-top: 4px solid #ffffff; /* White color */
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${spinAnimation} 0.8s linear infinite; /* Apply animation */
  
  /* Center the spinner horizontally and vertically */
  position: absolute;
  top: 50%;
  left: 65%;
  transform: translate(-50%, -50%);
`;

const LoadingSpinner = () => {
    return <Spinner />;
};

export default LoadingSpinner;