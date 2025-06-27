import styled from 'styled-components';

export const MobileNavStyled = styled.nav`
  display: ${({ $isMenuOpen }) => ($isMenuOpen ? 'block' : 'none')};
  background: white;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

export const MobileMenuItems = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 20px;
`;

export const MobileMenuItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  img {
    margin-right: 10px;
  }

  .active {
    font-weight: bold;
  }
`;

export const MobileLink = styled.span`
  font-size: 1.2rem;
  color: black;
  cursor: pointer;
`;

export const MobileMenuIcon = styled.div`
  display: none;
  // position: ;
  top: 10px;
  left: 10px;
  z-index: 1000;
  font-size: 2rem;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;
