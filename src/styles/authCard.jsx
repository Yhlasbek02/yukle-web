import styled from "styled-components";
import { Link } from "react-router-dom";
export const Card = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
    padding: 10px;
    border-radius: 30px;
    height: 100vh;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    form {
        margin-top: 10%;
        width: 500px;

    }

    h1 {
        font-size: 3rem;
        font-weight: 700;
        color: #4D9FFF;
        font-size: 20px;
        margin-bottom: 20px; /* Add spacing below the heading */
    }

    input {
        color: #4D9FFF;
        width: 65%;
        padding: 15px;
        font-size: 20px;
        margin-bottom: 15px;
        font-size: 16px;
        border: 1px solid #4D9FFF;
        border-radius: 15px;
        outline: none;
        transition: border-color 0.3s;
        background-color: rgba(77, 159, 255, 0.05);
        &:focus {
            border-color: #3498db;
        }
        &::-webkit-inner-spin-button,
        &::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        &::placeholder {
            color: #4D9FFF;
            font-weight: 300;
        }
    }

    button {
        width: 45%;
        padding: 10px;
        margin-top: 25px;
        margin-bottom: 25px;
        color: white;
        border: 3px solid #4D9FFF;
        color: #4D9FFF;
        font-size: 1.2rem;
        background-color: rgba(77, 159, 255, 0.05);
        border-radius: 20px;
        cursor: pointer;
        transition: background-color 0.3s;
        font-weight: 700;
    }

    button:hover {
        background-color: #4D9FFF;
        color: #fff;
    }
`;

export const Container = styled.div`
    text-align: center;
    padding: 10px;
    display: flex;
    justify-content: center; /* Horizontally center elements */
    align-items: center;
    .privacy {
        bottom: 0;
    }
    h1 {
        font-weight: 800;
        font-size: 2.5rem;
    }
    span {
        font-weight: 300;
        font-size: 15px;
        color: #4D9FFF;
        display: inline-flex;
    }
    .privacy {
        margin-top: 10px;
    }
`

export const RegisterLink = styled.p`
    
  margin-bottom: 20px;
  text-align: center;
  color: #555;

  a {
    color: #3498db;
    text-decoration: none;
    font-size: 1rem;
    font-weight: bold;
  }
`;

export const Mobile = styled.p`
    color: #3498db;
    text-decoration: none;
    font-size: 1rem;
    font-weight: bold;
`

export const Timer = styled.div`
  text-align: center;
  margin-top: 10px;
  font-size: 2rem;
  color: #4D9FFF;
  font-weight: bold;
`;

export const Paragraph = styled.p`
  text-align: center;
  margin-top: 10px;
  color: #4D9FFF;
  font-size: 1rem;
  margin-bottom: 2rem;
`;

export const CodeContainer = styled.div`
  display: flex;
  width: 50%
  align-items: center;
  justify-content: center;
  margin-bottom: 50px;
`

export const InputField = styled.input`
  width: 70px !important;
  height: 70px;
  margin: 5px;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #4D9FFF;
  border-radius: 10px;
  outline: none;
  transition: border-color 0.3s, background-color 0.3s;
  text-align: center;

  &:focus {
    border-color: #3498db;
    background-color: #f0f8ff;
     /* Light blue for focus */
  }

  &:disabled {
    background-color: #f0f0f0;
    cursor: not-allowed;
  }
`;

export const Input = styled.input`
  color: #4D9FFF;
  width: 100%; /* Adjust width to accommodate icon */
  padding: 12px 40px 12px 12px; /* Adjust padding for icon */
  font-size: 16px;
  border: 1px solid #4D9FFF;
  border-radius: 10px;
  outline: none;
  transition: border-color 0.3s;
  background-color: rgba(77, 159, 255, 0.1);
  box-sizing: border-box;
`;

export const EyeIcon = styled.div`
  position: absolute;
  top: 45%;
  transform: translateY(-50%);
  right: 20%;
  padding: 5px;
  cursor: pointer;
  color: #4D9FFF;
`;

export const TryAgainMessage = styled(Link)`
  text-align: center;
  color: red;
  font-size: 16px;
  text-decoration: none; /* Remove underline */
  cursor: pointer; /* Add cursor pointer for better user experience */
`;


export const InputContainer = styled.div`
  position: relative;
  width: 100%;
  margin: 10px 0;
`;
