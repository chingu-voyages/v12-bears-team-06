import React from 'react';
import {withRouter} from 'react-router-dom';
import Login from './Login/Login';
import Register from './Register/Register';
import Backdrop from '../UI/Backdrop/Backdrop';
import XIcon from '../UI/XIcon/XIcon';

const Auth = (props) => {

  return (
    !props.isVisible ? null : (
    <React.Fragment>
      <Backdrop show={true} clicked={props.hide}/>
      <div className="AuthModal"
          style={{
          transform: true ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: true ? '1' : '0'
        }}>
        <XIcon clicked={props.hide}/>
          <div className="form">
            <Login
              changedPassword={props.isNewUser ? undefined : props.changedPassword}
              changedEmail={props.isNewUser ? undefined : props.changedEmail}
              email={props.isNewUser ? undefined : props.email}
              password={props.isNewUser ? undefined : props.password}
              loading={props.isNewUser ? undefined : props.isLoading}
              submit={props.isNewUser ? undefined : props.submit}
              valid={props.isNewUser ? undefined : props.isValid}
              error={props.isNewUser ? undefined : props.isError}
              />
            <div className="line"></div>
            <Register 
              changedPassword={props.isNewUser ? props.changedPassword : undefined}
              changedEmail={props.isNewUser ? props.changedEmail : undefined}
              changedUsername={props.isNewUser ? props.changedUsername : undefined}
              email={props.isNewUser ? props.email : undefined}
              password={props.isNewUser ? props.password : undefined}
              loading={props.isNewUser ? props.isLoading : undefined}
              username={props.isNewUser ? props.username : undefined}
              submit={props.isNewUser ? props.submit : undefined}
              valid={props.isNewUser ? props.isValid : undefined}
              error={props.isNewUser ? props.isError : undefined}
              />
          </div>
      </div>
    </React.Fragment>
    )
  )
}

export default withRouter(Auth);
