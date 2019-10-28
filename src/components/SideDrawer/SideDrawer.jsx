import React from 'react';
import { FiX } from 'react-icons/fi';

import Nav from '../Nav/Nav';
import DrawerToggle from './DrawerToggle';
import Backdrop from '../UI/Backdrop/Backdrop';

const SideDrawer = ({ auth, authenticated, showSideDrawer, sideDrawerClosedHandler }) => {
  const classes = [
    'sidedrawer',
    showSideDrawer ? 'is_open' : null
  ];

  return (
    <React.Fragment>
      <div className={classes.join(' ')}>
        <DrawerToggle clicked={sideDrawerClosedHandler}>
          <FiX />
        </DrawerToggle>
        <Nav
          auth={auth}
          authenticated={authenticated}
          clicked={sideDrawerClosedHandler}/>
      </div>
      <Backdrop
        show={showSideDrawer}
        clicked={sideDrawerClosedHandler} />
    </React.Fragment>
  )
};

export default SideDrawer;