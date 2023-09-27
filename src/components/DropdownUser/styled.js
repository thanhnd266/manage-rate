import styled from "styled-components";

export const DropdownUserStyled = styled.div`
  position: relative;
`;

export const ButtonDropdown = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  text-decoration: none;
  cursor: pointer;

  .user__info {
    display: block;
    text-align: end;

    .user__info--name {
      display: block;
      line-height: 2rem;
    }
  }

  .user__info--avatar {
    overflow: hidden;

    img {
      width: 4.8rem !important;
      height: 4.8rem !important;
      object-fit: cover;
      object-position: center;
      border-radius: 100%;
    }
  }
`;

export const DropDownMenu = styled.div.attrs((props) => ({
  $dropdownOpen: props.$dropdownOpen ? "flex" : "none",
}))`
  position: absolute;
  right: 0;
  margin-top: 1.6rem;
  display: flex;
  flex-direction: column;
  width: 25rem;
  border: 1px solid #e2e8f0;
  background-color: #fff;
  box-shadow: 0px 8px 13px -3px rgba(0, 0, 0, 0.07);
  display: ${(props) => props.$dropdownOpen};
`;

export const DropdownList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  border-bottom: 1px solid #e2e8f0;
  padding: 3rem 2.4rem;

  .link-item {
    display: flex;
    align-items: center;
    gap: 1.4rem;
    font-size: 1.6rem;
    transition-duration: 300ms;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    text-decoration: none;
    color: #333;

    &:hover {
      color: #3c50e0;

      svg {
        fill: #3c50e0;
      }
    }

    svg {
      fill: #333;
    }
  }
`;

export const ButtonLogout = styled.button`
  display: flex;
  cursor: pointer;
  align-items: center;
  gap: 1.4rem;
  font-size: 1.6rem;
  padding: 1.6rem 2.4rem;
  transition-duration: 300ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    color: #3c50e0;

    svg {
      fill: #3c50e0;
    }
  }

  svg {
    fill: #333;
  }
`;
