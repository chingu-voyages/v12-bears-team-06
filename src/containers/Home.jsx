import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from '../utils/api';
import {checkValidity, updateObject} from '../utils/utility';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import SideDrawer from '../components/SideDrawer/SideDrawer';
import Auth from '../components/Auth/Auth';
import Message from '../components/Message/Message';

import index01 from '../assets/images/index_01.png';
import img_rusia from '../assets/images/destination_rusia.jpg';
import img_santorini from '../assets/images/destination_santorini.jpg';
import img_turkey from '../assets/images/destination_turkey.jpg';
import img_venice from '../assets/images/destination_venice.jpg';

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
    checkAuthState();
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

  useEffect(() => {
    if (isVisible) {
      document.body.setAttribute('style', 'overflow: hidden;');
    } else {
      document.body.removeAttribute('style', 'overflow: hidden;');
    }
  }, [isVisible]);

  let logoutMessage = null;
  if (props.history.action === 'REPLACE') {
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

  let buttonMain = <button className="plan" onClick={openModalHandler}>Start Planning</button>
  if(isAuth) {
    buttonMain = <button className="plan"><Link to="/board">Start Planning</Link></button>
  }

  const [showSideDrawer, setShowSideDrawer] = useState(false);
  const sideDrawerClosedHandler = () => {
    setShowSideDrawer(false);
  };

  const sideDrawerToggleHandler = () => {
    setShowSideDrawer((prevState) => {
      return !prevState.showSideDrawer
    });
  };

  const popular = [
    { name: 'Russia', img: img_rusia, param: 'country:37' },
    { name: 'santorini', img: img_santorini, param: 'region:42' },
    { name: 'venice', img: img_venice, param: 'city:44' },
    { name: 'turkey', img: img_turkey, param: 'country:34' },
  ];

  return (
    <div className="index">
      {logoutMessage}
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
      <Header
        auth={openModalHandler}
        authenticated={isAuth}
        showSideDrawer={showSideDrawer}
        sideDrawerClosedHandler={sideDrawerClosedHandler}
        sideDrawerToggleHandler={sideDrawerToggleHandler} />
      {!isVisible && (
        <SideDrawer
          auth={openModalHandler}
          authenticated={isAuth}
          showSideDrawer={showSideDrawer}
          sideDrawerClosedHandler={sideDrawerClosedHandler} />
      )}
      <section className="main">
        <section className="hero">
          <div>
            <h2>TRAVEL PLANNING MADE EASY</h2>
          <p>all your travel planning in one place</p>
          {buttonMain}
          </div>
        </section>
        <section id="about" className="intro">
          <div className="intro_text">
            <h2>EXPLORE A DIFFERENT<br />WAY TO TRAVEL</h2>
            <p>Now you only have to check one place for all your travel details.</p>
            <ul>
              <li>See the weather at your next destination.</li>
              <li>Explore the top 10 attractions and find out more by clicking on them.</li>
              <li>Create a to-do list with things that you still need to arrange before your trip or use it to write down your favorite activities and sights.</li>
            </ul>
              {button}
          </div>
          <div className="intro_img"><img src={index01} alt="" /></div>
        </section>
        <section className="popular">
          <h2>Popular Destinations</h2>
          <ul>
            {popular.map(item => (
              <li key={item.name}>
                <a href={`https://maps.sygic.com/#/?item=${item.param}`} target="_blank">
                  <img src={item.img} alt={item.name} />
                  <p><span>{item.name}</span></p>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </section>
      <Footer auth={openModalHandler} authenticated={isAuth} />
    </div>
  )
}

export default Home;
