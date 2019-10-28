import React from 'react';
import { Link } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';

import Nav from '../Nav/Nav';
import DrawerToggle from '../SideDrawer/DrawerToggle';

const Header = ({ auth, authenticated, showSideDrawer, sideDrawerToggleHandler }) => {

  return (
    <header className="header">
      <p className="app_title">
        <Link to="/">Travel Planning App</Link>
      </p>
      <Nav
        auth={auth}
        authenticated={authenticated} />
      <DrawerToggle
        showSideDrawer={showSideDrawer}
        clicked={sideDrawerToggleHandler}>
      <FiMenu />
    </DrawerToggle>
    </header>
  )
}

export default Header;
