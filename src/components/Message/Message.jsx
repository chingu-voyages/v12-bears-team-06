import React from 'react';
import Backdrop from '../UI/Backdrop/Backdrop';

const LogoutMessage = (props) => {
  return (
    <React.Fragment>
      <Backdrop show={true} clicked={props.hide}/>
      <p className="LogoutMessage">
        {props.error ? 'Something went wrong. Please try again.' : 'You have been successfully logged out.'}
      </p>
    </React.Fragment>
  )
}

export default LogoutMessage;
