import React from 'react';
import Loading from '../../Loading/Loading';
import Message from '../../UI/Message/Message';

const Login = (props) => {
  const message = props.error ? 'Password or email incorrect.' :
                  props.valid === false ? 'Please enter a valid password and email address.' : null

  return (
    <div>
      <h2>Log In</h2>
      <Message message={message}/>
      <form>
        <input type="email" placeholder="Email" name="email" onChange={props.changedEmail} value={props.email} required/>
        <input type="password"  placeholder="Password" name="password" onChange={props.changedPassword} value={props.password} required/>
        <button className="first" id="login" onClick={props.submit}>
          {props.loading ? <Loading /> : 'Login'}</button>
      </form>
    </div>
  )
}

export default Login;
