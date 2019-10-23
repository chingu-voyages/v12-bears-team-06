import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from '../utils/api';
import {checkValidity, updateObject} from '../utils/utility';
import Nav from '../components/Nav/Nav';
import Auth from '../components/Auth/Auth';
import Message from '../components/Message/Message';

const Home = (props) => {

  const [email, setEmail] = useState({
    value: '',
    validation: {
      required: true,
      isEmail: true
    },
    isValid: false
  });

  const [password, setPassword] = useState({
    value: '',
  });

  const [emailRegister, setEmailRegister] = useState({
    value: '',
    validation: {
      required: true,
      isEmail: true
    },
    isValid: false
  });

  const [passwordRegister, setPasswordRegister] = useState({
    value: '',
    validation: {
      required: true,
      minLength: 7,
    },
    isValid: false
  });

  const [username, setUsername] = useState({
    value: '',
    validation: {
      required: true,
      minLength: 3,
      alphanumeric: true
    },
    isValid: false
  });

  const [isValid, setIsValid] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);
  const [isLogoutMessage, setIsLogoutMessage] = useState(true);

  const checkAuthState = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsAuth(false);
    } else {
      axios.get('/auth', {headers: {'Authorization': token}})
        .then(res => {
          setIsAuth(true);
          })
        .catch(error => {
          setIsAuth(false);
        });
    }
  };

  const auth = (target, email, password, username, emailRegister, passwordRegister) => {
    setIsLoading(true);
    setIsError(false);
    let url = '/users/login';
    let data = {
      email: email,
      password: password
    }
    if (target === 'register') {
      url = '/users/register';
      data = {
        email: emailRegister,
        password: passwordRegister,
        username: username
      }
    }
    axios.post(url, data)
      .then(res => {
        localStorage.setItem('token', res.data.token);
        setIsAuth(true);
        setIsLoading(false);
        props.history.push('/board');
      })
      .catch(err => {
        setIsAuth(false);
        setIsLoading(false);
        setIsError(true);
      });
  };

  useEffect(() => {
    checkAuthState()
  }, []);


  const submitHandler = (event) => {
    event.preventDefault();
    if (event.target.id === 'register') {
      setIsNewUser(true);
    };
    if (event.target.id === 'login') {
      setIsNewUser(false);
    };
    if((email.isValid) || (emailRegister.isValid && passwordRegister.isValid && username.isValid)) {
      setIsValid(true);
      auth(event.target.id, email.value, password.value, username.value, emailRegister.value, passwordRegister.value);
    } else {
      setIsValid(false)
    }
  }

  const emailChangedHandler = (event) => {
    const updatedEmail = updateObject(email, {
      value: event.target.value,
      isValid: checkValidity(event.target.value, email.validation),
    });
    setEmail(updatedEmail);
  }
  const passwordChangedHandler = (event) => {
    const updatedPassword = updateObject(password, {
      value: event.target.value,
    });
    setPassword(updatedPassword);
  }
  const usernameChangedHandler = (event) => {
    const updatedUsername = updateObject(username, {
      value: event.target.value,
      isValid: checkValidity(event.target.value, username.validation),
    });
    setUsername(updatedUsername);
  }
  const emailRegisterChangedHandler = (event) => {
    const updatedEmail = updateObject(emailRegister, {
      value: event.target.value,
      isValid: checkValidity(event.target.value, emailRegister.validation),
    });
    setEmailRegister(updatedEmail);
  }
  const passwordRegisterChangedHandler = (event) => {
    const updatedPassword = updateObject(passwordRegister, {
      value: event.target.value,
      isValid: checkValidity(event.target.value, passwordRegister.validation),
    });
    setPasswordRegister(updatedPassword);
  }

  const openModalHandler = () => {
    setIsVisible(true);
    setIsError(false);
  }

  const closeModalHandler = () => {
    setIsVisible(false);
    const updatedPassword = updateObject(password, {
      value: ''
    });
    setPassword(updatedPassword);
    const updatedEmail = updateObject(email, {
      value: ''
    });
    setEmail(updatedEmail);
    const updatedUsername = updateObject(username, {
      value: ''
    });
    setUsername(updatedUsername);
    const updatedPasswordRegister = updateObject(passwordRegister, {
      value: ''
    });
    setUsername(updatedPasswordRegister);
    const updatedEmailRegister = updateObject(emailRegister, {
      value: ''
    });
    setUsername(updatedEmailRegister);
  }

  let logoutMessage = null;
  if (props.history.action === 'PUSH') {
    logoutMessage = <Message/>
      setTimeout(() => {
        setIsLogoutMessage(false);
      }, 1000);
  }
  if (!isLogoutMessage) {
    logoutMessage = null;
  }

  let button = <button className="plan" onClick={openModalHandler}>Plan your trip</button>
  if(isAuth) {
    button = <button className="plan"><Link to="/board">Plan your trip</Link></button>
  }

  return (
    <React.Fragment>
      {logoutMessage}
      <Nav auth={openModalHandler} authenticated={isAuth}/>
      <Auth
        isVisible={isVisible}
        isValid={isValid}
        isError={isError}
        isLoading={isLoading}
        hide={closeModalHandler}
        submit={(event) => submitHandler(event)}
        changedEmail={(event) => emailChangedHandler(event)}
        changedPassword={(event) => passwordChangedHandler(event)}
        changedUsername={(event) => usernameChangedHandler(event)}
        changedEmailRegister={(event) => emailRegisterChangedHandler(event)}
        changedPasswordRegister={(event) => passwordRegisterChangedHandler(event)}
        email={email.value}
        password={password.value}
        username={username.value}
        emailRegister={emailRegister.value}
        passwordRegister={passwordRegister.value}
        isNewUser={isNewUser}
        />
      {button}
    </React.Fragment>
  )
}

export default Home;
