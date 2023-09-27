import styled from "styled-components";

export const NavbarStyled = styled.header`
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  width: 100%;
  background: #fff;
  filter: drop-shadow(0 1px 2px rgb(0 0 0 / 0.1))
    drop-shadow(0 1px 1px rgb(0 0 0 / 0.06));
`;

export const NavbarWrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: space-between;
  padding: 1.6rem 4.4rem;
  width: 100%;
`;

export const NavbarLeftContent = styled.div`
  display: none;
  align-items: center;
  gap: 0.8rem;

  @media screen and (max-width: 61.9375em) { //991px
    display: flex;
  }

  .navbar__button-menu {
    cursor: pointer;
    border-radius: 2px;
    border: 1px solid #e2e8f0;
    background: #fff;
    padding: 0.6rem;
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
    width: 4rem;
    height: 3.6rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    margin-right: 1rem;
  }

  .navbar__logo {
    display: block;

    img {
      object-fit: cover;
      border-radius: 100%;
    }
  }
`;

export const NavbarRightContent = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;
