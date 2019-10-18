import React from 'react';
import Upload from './Upload/Upload';

const Avatar = (props) => {

  return (
    <div>
      {props.avatar ? <img src={`data:image/png;base64,${props.avatar}`} alt="User Avatar"></img> : null}
      <Upload upload={props.upload}/>
      <button onClick={props.submit}>Upload</button>
    </div>
  )
}

export default Avatar;
