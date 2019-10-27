import React from 'react';
import { FiMenu } from 'react-icons/fi';

import Nav from '../Nav/Nav';
import DrawerToggle from '../SideDrawer/DrawerToggle';

const Header = ({ auth, authenticated, showSideDrawer, sideDrawerToggleHandler }) => {

  return (
    <header className="header">
      <p className="app_title">Travel Planning App</p>
      <Nav auth={auth} authenticated={authenticated} />
      <DrawerToggle
        showSideDrawer={showSideDrawer}
        clicked={sideDrawerToggleHandler}>
      <FiMenu />
    </DrawerToggle>
    </header>
  )
}

export default Header;
