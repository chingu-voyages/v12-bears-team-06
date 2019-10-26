import React from 'react';
import classes from './XIcon.module.scss';

const XIcon = (props) => {
  return (
    <div className={props.destination ? classes.Destination : classes.XIcon} onClick={props.clicked}>
      <div className={classes.icon}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  )
};

export default XIcon;
