import React from 'react';

const Upload = (props) => {

  return (
    <React.Fragment>
      <input type="file" name="avatar" id="avatar" className="inputFile" onChange={props.upload}/>
      <label htmlFor="avatar">Choose image</label>
    </React.Fragment>
  );
};


export default Upload;
