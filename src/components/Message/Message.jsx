import React from 'react';
import Backdrop from '../UI/Backdrop/Backdrop';

const Message = (props) => {
  return (
    <React.Fragment>
      <Backdrop show={true} clicked={props.hide}/>
      <p className="LogoutMessage">
        {props.error && !props.isUpload ? 'Something went wrong. Please try again.'
          : props.error && props.isUpload ? 'Something went wrong. Please try again. Maximum file size 2.5 MB'
          : 'You have been successfully logged out.'}
      </p>
    </React.Fragment>
  )
}

export default Message;
