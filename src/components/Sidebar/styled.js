import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const SidebarWrapper = styled.aside`
    position: absolute;
    left: 0;
    top: 0;
    z-index: 20;
    display: flex;
    height: 100vh;
    width: ${props => props.$sidebarSmall ? "100px": "290px"};
    flex-direction: column;
    overflow-y: hidden;
    background: #1C2434;
    transition-duration: 300ms;
    transition-timing-function: linear;

    @media screen and (min-width: 62em) { //992px
        transform: translateX(0px);
        position: static;
    }

    transform: ${(props) => props.$sidebarOpen ? "translateX(0px)" : "translateX(-100%)"};
`;

export const SidebarHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    transition: all 300ms ease-in;
    gap: 0.8rem;
    padding: ${(props) => props.$sidebarSmall ? "26px 40px" : "26px 36px 26px 40px"};

    @media screen and (max-width: 61.9375em) { //991px
        padding: 26px 32px;
    }

    .button__toggle--mini-sidebar {
        display: none;
        width: ${(props) => props.$sidebarSmall ? "100%" : "unset"};
        cursor: pointer;
        border-radius: 100%;
        color: ${props => props.theme.colors.bodydark1};
        font-size: 20px;

        @media screen and (min-width: 62em) { //992px
            display: block;
        }
    }

    .button__toggle--open {
        display: flex;
        align-items: center;
        border-radius: 100%;
        padding: 1.2rem;
        cursor: pointer;
        
        &:hover {
            background:  ${props => props.theme.colors.graydark};
        }

        @media screen and (min-width: 62em) { //992px
            display: none;
        }
    }
`;

export const SidebarMenu = styled.div`
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    transition-property: all;
    transition-duration: 300ms;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
`;

export const SidebarMenuWrapper = styled.div`
    margin-top: 1.2rem;
    padding: ${props => props.$sidebarSmall ? "16px 12px" : "16px 24px"};

    @media screen and (max-width: 61.9375em) { //991px
        padding: 16px;
        margin-top: 20px;
    }

    .sidebar__menu--title {
        margin-bottom: 1.6rem;
        margin-left: 1.6rem;
        font-size: 14px;
        font-weight: 600;
        color: ${(props) => props.theme.colors.bodydark2};
    }

    .menu-icon {
        width: 24px;
        height: 22px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: ${props => props.$sidebarSmall ? "22px" : "18px"};
        transition: font-size 500ms ease-in;
    }

    .menu-name {
        white-space: nowrap;
        width: ${props => props.$sidebarSmall ? "0" : "100%"};
        height: ${props => props.$sidebarSmall ? "0" : "auto"};
        display: ${props => props.$sidebarSmall ? "unset" : "block"};
        transition: all 0.3s ease-in;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`;

export const SidebarMenuList = styled.ul`
    margin-bottom: 2.4rem;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
`;

export const SidebarMenuItemGroup = styled(NavLink)`
    position: relative;
    display: flex;
    align-items: center;
    gap: 1rem;
    border-radius: 20px;
    padding: 8px 16px;
    font-weight: 500;
    text-decoration: none;
    font-size: 16px;
    transition: all 300ms ease-in-out;
    color: ${(props) => props.$isSelected ? "#333" : props.theme.colors.bodydark1};
    background: ${(props) => props.$isSelected ? "#f0f2f5" : "transparent"};

    &:hover {
        color: ${(props) => props.$isSelected ? "#333" : "#fff"};
    }

    .icon-dropdown {
        position: absolute;
        right: 1.6rem;
        top: 50%;
        transform: translateY(-50%);
        fill: ${props => props.theme.colors.current};
    }

    .rotate-180 {
        transform: translateY(-50%) rotate(180deg);
    }
`;

export const SidebarMenuDropdown = styled.div`
    overflow: hidden;
    display: ${props => props.$isOpen ? "block" : "none"};

    .dropdown__child--list {
        margin-bottom: 22px;
        margin-top: 16px;
        display: flex;
        flex-direction: column;
        gap: 2rem;
        padding-left: ${props => props.$sidebarSmall ? "8px" : "16px"};
        transition: all 300ms ease-in-out;

        .sidebar-menu__grandchild {
            position: relative;
            display: flex;
            align-items: center;
            gap: 1rem;
            border-radius: 0.6rem;
            padding: 0 16px;
            font-size: 16px;
            font-weight: 500;
            text-decoration: none;
            transition: all 300ms ease-in-out;
            color: ${(props) => props.theme.colors.bodydark2};

            &:hover {
                color: #fff;
            }
        }

        .sidebar-menu__grandchild.active-item {
            color: #fff;
        }
    }
`;

export const SidebarMenuChildGroup = styled(SidebarMenuItemGroup)`
    color: ${props => props.theme.colors.bodydark1};
    background-color: ${(props) => props.$isSelected ? props.theme.colors.graydark : "transparent"};
    transition: all 300ms ease-in-out;

    &:hover {
        background-color: ${(props) => props.theme.colors.graydark};
        color: ${props => props.theme.colors.bodydark1};
    }
`;

export const SidebarMenuChildList = styled.ul`
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding-left: 24px;
`;
