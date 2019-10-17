import React from 'react';
import Loading from '../../Loading/Loading';
import Message from '../../UI/Message/Message';

const Register = (props) => {
  const message = props.error ? 'Something went wrong. Please try again.' :
                  props.valid === false ? 'Please enter a valid password and email address. Your password must contain at least 7 characters.' : null

  return (
    <div>
      <h2>Create Account</h2>
      <Message message={message}/>
      <form>
        <input type="username" placeholder="Username" name="email" onChange={props.changedUsername} value={props.username} required/>
        <input type="email" placeholder="Email" name="email" onChange={props.changedEmail} value={props.email} required/>
        <input type="password"  placeholder="Password" name="password" onChange={props.changedPassword} value={props.password} required/>
        <button className="second" id="register" onClick={props.submit}>{props.loading ? <Loading/> : 'Register'}</button>
      </form>
    </div>
  )
}

export default Register;
