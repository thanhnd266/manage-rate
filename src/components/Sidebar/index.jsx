import Logo from "@/assets/images/logo/logo.png";
import { ROUTERS } from "@/constants/router";
import { checkListAllowed, checkPermission } from "@/helpers/checkPermission";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import SidebarLinkGroup from "../SidebarLinkGroup";
import { SidebarHeader, SidebarMenu, SidebarMenuChildGroup, SidebarMenuChildList, SidebarMenuDropdown, SidebarMenuItemGroup, SidebarMenuList, SidebarMenuWrapper, SidebarWrapper } from "./styled";
import { Tooltip } from "antd";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const { pathname } = location;
  const [isSidebarSmall, setIsSidebarSmall] = useState(false);

  const userInfo = useSelector((state) => state.users.user);

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");

  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded);
    if (sidebarExpanded) {
      document.querySelector("body").classList.add("sidebar-expanded");
    } else {
      document.querySelector("body").classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <SidebarWrapper
      ref={sidebar}
      $sidebarOpen={sidebarOpen}
      $sidebarSmall={isSidebarSmall}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <SidebarHeader $sidebarSmall={isSidebarSmall}>
        {/* {!isSidebarSmall && (
          <NavLink to="/">
            <img src={Logo} alt="Logo" />
          </NavLink>
        )} */}

        <button
          ref={trigger}
          onClick={() => setIsSidebarSmall(!isSidebarSmall)}
          className="button__toggle--mini-sidebar"
        >
          {isSidebarSmall && <i className="fa-regular fa-bars"></i>}
          {!isSidebarSmall && <i className="fa-sharp fa-solid fa-xmark"></i>}
        </button>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="button__toggle--open"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="fff"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill="#fff"
            />
          </svg>
        </button>
      </SidebarHeader>
      {/* <!-- SIDEBAR HEADER --> */}

      <SidebarMenu>
        {/* <!-- Sidebar Menu --> */}
        <SidebarMenuWrapper $sidebarSmall={isSidebarSmall}>
          {/* <!-- Menu Group --> */}
          <div>
            <h3 className="sidebar__menu--title">
              MENU
            </h3>

            <SidebarMenuList>
              {ROUTERS.map((item) => {
                if(item.children) {
                  if(checkListAllowed(userInfo?.permissions, item.children)) {
                    return (
                      <SidebarLinkGroup
                        activeCondition={
                          pathname.includes(`${item.path}`)
                        }
                        key={item.id}
                      >
                        {(handleClick, open) => {
                          return (
                            <React.Fragment>
                              <SidebarMenuItemGroup
                                $isSelected={pathname.includes(`${item.path}`)}
                                onClick={(e) => {
                                  e.preventDefault();
                                  sidebarExpanded
                                    ? handleClick()
                                    : setSidebarExpanded(true);
                                }}
                              >
                                <Tooltip placement="right" title={item.name} className="menu-icon">{item.icon}</Tooltip>
                                {!isSidebarSmall && <span className="menu-name">{item.name}</span>}
                                <svg
                                  className={`icon-dropdown ${open && "rotate-180"}`}
                                  width="20"
                                  height="20"
                                  viewBox="0 0 20 20"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                                    fill=""
                                  />
                                </svg>
                              </SidebarMenuItemGroup>
                              {/* <!-- Dropdown Menu Start --> */}
                              <SidebarMenuDropdown
                                $sidebarSmall={isSidebarSmall}
                                $isOpen={open}
                              >
                                <ul className="dropdown__child--list">
                                  {item.children?.map((child) => {
                                    if(child.children) {
                                      if(checkListAllowed(userInfo?.permissions, child.children)) {
                                        return (
                                          <SidebarLinkGroup
                                            activeCondition={
                                              pathname.includes(`${child.path}`)
                                            }
                                            key={child.id}
                                          >
                                            {(handleClick, open) => {
                                              return (
                                                <React.Fragment>
                                                  <SidebarMenuChildGroup
                                                    $isSelected={pathname.includes(`${child.path}`)}
                                                    onClick={(e) => {
                                                      e.preventDefault();
                                                      sidebarExpanded
                                                        ? handleClick()
                                                        : setSidebarExpanded(true);
                                                    }}
                                                  >
                                                    <Tooltip placement="right" title={item.name}>
                                                      {child.icon}
                                                    </Tooltip>
                                                    {isSidebarSmall && child.name}
                                                    <svg
                                                      className={`icon-dropdown ${open && "rotate-180"}`}
                                                      width="20"
                                                      height="20"
                                                      viewBox="0 0 20 20"
                                                      fill="none"
                                                      xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                      <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                                                        fill=""
                                                      />
                                                    </svg>
                                                  </SidebarMenuChildGroup>
                                                  {/* <!-- Dropdown Menu Start --> */}
                                                  <div
                                                    style={{ overflow: "hidden", display: !open ? "none" : "block" }}
                                                  >
                                                    <SidebarMenuChildList>
                                                      {child.children?.map((grandChild) => {
                                                          if(checkPermission(userInfo?.permissions, grandChild.permission)) {
                                                            return (
                                                              <NavLink
                                                                to={grandChild.path}
                                                                className={({ isActive }) =>
                                                                  "sidebar-menu__grandchild " +
                                                                  (isActive && "active-item")
                                                                }
                                                                key={grandChild.id}
                                                              >
                                                                {grandChild.name}
                                                              </NavLink>
                                                            )
                                                          }
                                                          return null;
                                                      })}
                                                    </SidebarMenuChildList>
                                                  </div>
                                                  {/* <!-- Dropdown Menu End --> */}
                                                </React.Fragment>
                                              );
                                            }}
                                          </SidebarLinkGroup>
                                        )
                                      }
                                    } else {
                                      if(checkPermission(userInfo?.permissions, child.permission)) {
                                        return (
                                          <NavLink
                                            to={child.path}
                                            className={({ isActive }) =>
                                              "sidebar-menu__grandchild " +
                                              (isActive && "active-item")
                                            }
                                            key={child.id}
                                          >
                                            <Tooltip placement="right" title={child.name} className="menu-icon">{child.icon}</Tooltip>
                                            <span className="menu-name">{!isSidebarSmall && child.name}</span>
                                          </NavLink>
                                        )
                                      }
                                      return null;
                                    }
                                  })}
                                </ul>
                              </SidebarMenuDropdown>
                              {/* <!-- Dropdown Menu End --> */}
                            </React.Fragment>
                          );
                        }}
                      </SidebarLinkGroup>
                    )
                  } 
                } else {
                  return <Fragment key={item.id}></Fragment>
                }
              })}
            </SidebarMenuList>
          </div>
        </SidebarMenuWrapper>
        {/* <!-- Sidebar Menu --> */}
      </SidebarMenu>
    </SidebarWrapper>
  );
};

export default Sidebar;
