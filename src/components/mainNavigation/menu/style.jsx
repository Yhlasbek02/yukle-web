import styled from "styled-components";

export const MenuStyle = styled.div`
    background-color: rgba(79, 36, 0, 0.2);
    padding: 20px;
    width: 90%;
    border-radius: 10px;
    height: 250px;
`
export const Title = styled.h3`
    font-size: 1.1rem;
    color: #fff;
    font-family: Arial, sans-serif;
    padding-bottom: 5px;
`

export const MenuItems = styled.div`
    padding: 10px;
`

export const Item = styled.div`
    padding-top: 5px;
    display: flex;
    img {
        height: 37px;
        width: 37px;
    }
`

export const Link = styled.a`
    text-decoration: none;
    cursor: pointer;
    font-size: 15px;
    color: #fff;
    display: block;
    padding-bottom: 5px;
    padding-top: 15px;
    padding-left: 5px;
    &.active {
        font-weight: 700;
    }
` 