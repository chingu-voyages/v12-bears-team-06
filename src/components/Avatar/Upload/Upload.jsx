import React from 'react';

const Upload = (props) => {

  return (
    <input type="file" name="avatar" onChange={props.upload}/>
  );
};


export default Upload;
