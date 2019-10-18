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
              changedPassword={props.changedPassword}
              changedEmail={props.changedEmail}
              email={props.email}
              password={props.password}
              submit={props.submit}
              loading={props.isNewUser ? undefined : props.isLoading}
              valid={props.isNewUser ? undefined : props.isValid}
              error={props.isNewUser ? undefined : props.isError}
              />
            <div className="line"></div>
            <Register
              changedPassword={props.changedPasswordRegister}
              changedEmail={props.changedEmailRegister}
              changedUsername={props.changedUsername}
              email={props.emailRegister}
              password={props.passwordRegister}
              username={props.username}
              submit={props.submit}
              loading={props.isNewUser ? props.isLoading : ''}
              valid={props.isNewUser ? props.isValid : undefined}
              error={props.isNewUser ? props.isError : undefined}
              focus={props.focus}
              />
          </div>
      </div>
    </React.Fragment>
    )
  )
}

export default withRouter(Auth);
