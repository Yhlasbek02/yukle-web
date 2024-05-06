import styled from "styled-components";
export const Window = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
`


export const Container = styled.div`
    border-radius: 25px;
    border: 3px solid #85BDFF;
    height: 12rem;
    width: 45%;
    margin: 1rem;
    cursor: pointer;
`

export const TypePart = styled.div`
    padding: 0.7rem;
    width: 100%;
    height: 0.5rem;
    margin-bottom: 1rem;
    font-size: 1rem;
`

export const Location = styled.div`
    background: #E7F2FF;
    width: 100%;
    height: 5rem;
    padding: 0.8rem;
    img {
        width: 1.7rem;
        padding-right: 2px;
    }
`

export const From = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    padding-bottom: 10px;
    font-size: 1rem;
`

export const Properties = styled.div`
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem;
`

export const SingleProperty = styled.div`
    margin-top: 0.5rem;
    display: flex;
    p {
        font-weight: 700;
        font-size: 1rem;
    }
    span {
        font-size: 1rem;
    }
`

export const Title = styled.h3`
    font-size: 3rem;
    color: #4D9FFF;
    text-align: center;
    width: 100%;
    font-weight: 800;
    margin-bottom: 1.2rem;
`

export const FirstLine = styled.div`
    display: flex;
`

export const LogOut = styled.button`
    border-radius: 30px;
    padding: 10px 45px;
    border: 2px solid #4D9FFF;
    color: #4D9FFF;
    background: #fff;
    height: 3rem;
    font-size: 1.2rem;
`

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
    align-items: center;
    z-index: 9999;
`;

export const ModalContainer = styled.div`
    background-color: white;
    border-radius: 20px;
    padding: 20px;
    justify-content: center;
    width: 30%;
    height: 60%;
    overflow-y: auto;
`;


export const ModalContent = styled.div`
  margin-top: 20px;
`;

export const ModalTitle = styled.div`
    display: flex;
    align-text: center;
    justify-content: center;
    color: #4D9FFF;
    font-size: 1.5rem;
    margin-bottom: 10px;
`

export const ModalInfo = styled.div`
    border: 2px solid #4D9FFF;
    padding: 0.8rem;
    border-radius: 20px;
    margin-bottom: 10px;
    text-align: left;
    background-color: rgba(77, 159, 255, 0.05);
    h3 {
        color: #0075FF;
        font-size: 1.2rem;
    }
    span {
        font-size: 0.8rem;
    }
`