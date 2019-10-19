import React from 'react';
import Upload from './Upload/Upload';
import Loading from '../Loading/Loading';
import BlankAvatar from '../../assets/images/avatar.jpg';

const Avatar = (props) => {

  return (
    <div className="avatar container container_weather">
      {props.avatar ?
        <img src={`data:image/png;base64,${props.avatar}`} alt="User Avatar"/>
        : <img src={BlankAvatar} alt="Blank Avatar" />}
      <p>{props.username}</p>
      <Upload upload={props.upload}/>
      { props.isUpload ? (<button onClick={props.submit}>{props.isLoading ? <Loading/> : 'Upload'}</button>) : null }
    </div>
  )
}

export default Avatar;
