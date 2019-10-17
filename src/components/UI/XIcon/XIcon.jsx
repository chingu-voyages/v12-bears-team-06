import React from 'react';
import classes from './XIcon.module.scss';

const XIcon = (props) => {

  return (
    <div className={classes.XIcon} onClick={props.clicked}>
      <div className={classes.open}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  )
};

export default XIcon;
