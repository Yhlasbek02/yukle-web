import styled from "styled-components";

export const MenuStyle = styled.div`
    background-color: rgba(79, 36, 0, 0.2);
    padding: 1rem;
    width: 90%;
    border-radius: 10px;
    height: 250px;
    @media (max-width: 768px) {
        padding: 0.5rem;
    }
`
export const Title = styled.h3`
    font-size: 1.1rem;
    color: #fff;
    font-family: Arial, sans-serif;
    padding-bottom: 5px;
    @media (max-width: 768px) {
        font-size: 1rem;
    }
`

export const MenuItems = styled.div`
    padding: 10px;
    @media (max-width: 768px) {
        padding: 5px;
    }
`

export const Item = styled.div`
    padding-top: 5px;
    display: flex;
    img {
        height: 37px;
        width: 37px;
    }
    @media (max-width: 768px) {
        padding-top: 5px;
    }
`

export const Link = styled.a`
    text-decoration: none;
    cursor: pointer;
    font-size: 15px;
    color: #fff;
    display: block;
    padding: 15px 5px 5px 5px;
    &.active {
        font-weight: 700;
    }
    @media (max-width: 768px) {
        font-size: 13px;
        padding: 10px 5px;
    }
` 