import styled from "styled-components";
import navImg from "../assets/Rectangle.svg"
export const AppStyled = styled.div`
    // width: 100%;
    margin: 0;
    padding: 0;
`;

export const MainLayout = styled.div`
    display: flex;
    gap: 1rem;
    min-height: 100vh;
    overflow-y: auto;
    @media (max-width: 768px) {
      flex-direction: column;
      gap: 0;
    }
`;

export const NavStyled = styled.nav`
    padding: 2rem;
    border-radius: 20px;
    width: 550px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: url(${navImg});
    background-size: cover;
    transition: transform 0.3s ease-in-out;
    transform: translateX(0);
    @media (max-width: 1024px) {
      width: 400px;
    }
    @media (max-width: 768px) {
      position: fixed;
      width: 70px;
      top: 0;
      left: 0;
      flex-direction: row;
      border-radius: 0px 20px 20px 0px;
      height: 100%;
      background: white;
      transform: ${({ $isMenuOpen }) => ($isMenuOpen ? 'translateX(0)' : 'translateX(-100%)')};
      z-index: 999;
    }
    @media (max-width: 426px) {
      width: 50px;
    }
`;


export const MenuIcon = styled.div`
  display: none;
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 1000;
  font-size: 2rem;
  cursor: pointer;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

export const MainPages = styled.main`
    width: 65%;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    @media (max-width: 1024px) {
      width: 60%;
    }
    @media (max-width: 768px) {
      width: 100%;
      margin: 0;
      padding: 0;
    }
`

export const MenuItem = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    margin-top: 3rem;
    display: block;
  }
`

export const Li = styled.li`
  grid-template-columns: 40px auto;
  align-items: center;
  justify-content: center;
  margin: .6rem 0;
  font-weight: 500;
  transition: all .2s ease-in-out;
  color: rgba(255, 255, 255, 0.6);
  position: relative;
`


export const Username = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
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
    padding-right: 1rem;
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
  @media (max-width: 768px) {
    .left {
      padding-left: 10px;
      h4 {
        font-size: 0.9rem;
      }
      h3 {
        font-size: 1rem;
      }
    }

    .right {
      padding-right: 20px;
      font-size: 1.5rem;
    }
  }
`;


export const Backdrop = styled.div`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 998;

  @media (max-width: 768px) {
    display: ${({ $isMenuOpen }) => ($isMenuOpen ? 'block' : 'none')};
  }
`;