import styled from 'styled-components';

export const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    text-align: center;
    z-index: 9999;
`;

export const ModalContainer = styled.div`
    background-color: white;
    border-radius: 8px;
    padding: 20px;
    width: 35%;
    height: 100%;
    overflow-y: auto;
    @media (max-width: 768px) {
        width: 60%;
    }
    @media (min-width: 425px) {
        margin-top: 0.5rem;
        width: 90%;
    }
`;


export const ModalContent = styled.div`
  margin-top: 20px;
`;

export const ModalHeader = styled.div`
    justify-content: space-between;
    margin-bottom: 15px;
    text-align: center;
    font-size: 2rem;
    color: #4D9FFF;
    font-weight: 700;
`

export const ModalBody = styled.div`
    label {
        font-size: 1rem;
        display: block;
        margin-bottom: 5px;
        text-align: left;
        padding-left: 7px;
    }

    input,
    select {
        width: 100%;
        padding: 10px;
        height: 2.5rem;
        margin-bottom: 10px;
        border: 1px solid #4D9FFF;
        border-radius: 15px;
        color: #4D9FFF;
        font-size: 1rem;
        padding-left: 0.5rem;
    }
`
export const ModalCouple = styled.div`
    display:flex;
    width: 100%;
`

export const ChildCouple = styled.div`
    width: 48.5%;
`
export const ModalOption = styled.option`
    font-size: 1rem;
    background-color: #fff;
    color: #4D9FFF;
    padding: 15px;
`
export const ModalFooter = styled.div`
  button {
    padding: 20px 60px;
    cursor: pointer;
    background-color: #4D9FFF;
    color: #fff;
    border: none;
    border-radius: 30px;
    outline: none;
    font-size: 1rem;
    &:hover {
        background-color: #388eff; /* Change background color on hover */
        transition: background-color 0.2s ease-in-out; /* Add a smooth transition */
    }
  }
`;

export const ModalTextArea = styled.textarea`
  width: 100%;
  min-height: 3rem;
  border-radius: 20px;
  border: 1px solid #4D9FFF;
  font-size: 1rem;
  padding: 0.5rem;
  color: #4D9FFF;
  margin-bottom: 0.5rem;
`
