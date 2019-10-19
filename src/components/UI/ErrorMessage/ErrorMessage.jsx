import React from 'react';

const Message = (props) => {

  return (
    props.message ? <p className="message">{props.message}</p> : null
  )
}

export default Message;
