import { Link } from 'react-router-dom'
import { NavbarLeftContent, NavbarRightContent, NavbarStyled, NavbarWrapper } from './styled'
import DropdownUser from '../DropdownUser'

const Navbar = (
  props
) => {  

  return (
    <NavbarStyled>
      <NavbarWrapper>
        <NavbarRightContent>
          <ul className='flex items-center gap-2 2xsm:gap-4'>
            {/* <!-- Dark Mode Toggler --> */}
            {/* <DarkModeSwitcher /> */}
            {/* <!-- Dark Mode Toggler --> */}

            {/* <!-- Notification Menu Area --> */}
            {/* <DropdownNotification /> */}
            {/* <!-- Notification Menu Area --> */}

          </ul>

          {/* <!-- User Area --> */}
          <DropdownUser />
          {/* <!-- User Area --> */}
        </NavbarRightContent>

        <NavbarLeftContent>
          {/* <!-- Hamburger Toggle BTN --> */}
          <button
            aria-controls='sidebar'
            aria-expanded={props.sidebarOpen}
            onClick={(e) => {
              e.stopPropagation()
              props.setSidebarOpen(!props.sidebarOpen)
            }}
            className='navbar__button-menu'
          >
            <i className="fa-solid fa-bars"></i>
          </button>
          {/* <!-- Hamburger Toggle BTN --> */}

          <Link className='navbar__logo' to='/'>
            <img 
              src="data:image/png;base64,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" 
              alt='Logo' 
              width={40}
              height={40}
            />
          </Link>
        </NavbarLeftContent>
      </NavbarWrapper>
    </NavbarStyled>
  )
}

export default Navbar
