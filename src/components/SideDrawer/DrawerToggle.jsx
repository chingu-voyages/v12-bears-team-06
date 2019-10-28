import React from 'react';

const DrawerToggle = ({ clicked, showSideDrawer, children }) => {
  const classes = [
    'btn_sidedrawer_open',
    showSideDrawer ? 'active' : null
  ];

  return (
    <button
      className={classes.join(' ')}
      onClick={clicked}>
      {children}
    </button>
  );
};

export default DrawerToggle;