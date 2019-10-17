import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {checkValidity, updateObject} from '../utils/utility';
import Nav from '../components/Nav/Nav';
import Auth from '../components/Auth/Auth';

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

  const auth = (email, password, username) => {
    setIsLoading(true);
    setIsError(false);
    let url = '/users/login';
    let data = {
      email: email,
      password: password
    }
    if (isNewUser) {
      url = '/users/register';
      data = {
        email: email,
        password: password,
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
    if(email.isValid && password.isValid) {
      auth(email.value, password.value, username.value);
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
      isValid: checkValidity(event.target.value, password.validation),
    });
    setPassword(updatedPassword);
  }

  const usernameChangedHandler = (event) => {
    const updatedUsername = updateObject(username, {
      value: event.target.value,
      isValid: checkValidity(event.target.value, username.validation),
    });
    setUsername(updatedUsername);
    setIsNewUser(true);
  }

  const openModalHandler = () => {
    setIsVisible(true);
    setIsError(false);
  }

  const closeModalHandler = () => {
    setIsVisible(false);
    setIsNewUser(true);
  }

  return (
    <React.Fragment>
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
        isNewUser={isNewUser}
        email={email.value}
        password={password.value}
        username={username.value}/>
      <button className="plan">Plan your trip</button>
    </React.Fragment>
  )
}

export default Home;
