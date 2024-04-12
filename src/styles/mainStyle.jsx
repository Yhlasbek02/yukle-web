import styled from "styled-components";
import navImg from "../assets/Rectangle.svg"
export const AppStyled = styled.div`
    main{
      flex: 1;
      border-radius: 32px;
      // overflow-y: scroll;
      // &::-webkit-scrollbar{
      //   width: 0;
      // }
    }
    body {
        padding: 0;
        margin: 0;
    }
`;

export const MainLayout = styled.div`
    display: flex;
    gap: 1rem;
    min-height: 100vh; /* Take up full height */
    overflow-y: auto;
`;

export const NavStyled = styled.nav`
    padding: 2rem;
    border-radius: 20px;
    width: 30%;
    // overflow-y: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 2rem;
    background: url(${navImg});
    background-size: cover;
    margin-bottom: 1rem;
    
    .menu-items {
        flex: 1;
        display: flex;
        flex-direction: column;
        li {
            grid-template-columns: 40px auto;
            align-items: center;
            justify-content: center;
            margin: .6rem 0;
            font-weight: 500;
            transition: all .2s ease-in-out;
            color: rgba(255, 255, 255, 0.6);
            position: relative;
        }
    }
    .bottom-nav {
        cursor: pointer;
    }
`;


export const Username = styled.div`
  display: flex;
  justify-content: space-between; /* Distribute items evenly between left and right */
  align-items: center; /* Align items vertically in the center */
  .left {
    padding-left: 15px;
    h4 {
      font-size: 1rem;
      color: #fff;
      font-weight: 400;
    }
    h3 {
        font-size: 1.2rem;
        color: #fff;
    }
  }
  .right {
    position: relative;
    display: inline-block;
    padding-right: 40px;
    display: flex;
    color: #fff;
    font-size: 1.8rem;
  }
  .right FiBell {
    position: relative;
    top: 20%; /* Move icon 5px down */
    cursor: pointer;
    transform: translateY(-5px);
  }
`;
