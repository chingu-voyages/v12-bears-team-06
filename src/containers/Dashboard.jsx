import React, { useState, useEffect } from 'react';
import axios from '../utils/api';

import Avatar from '../components/Avatar/Avatar';
import Destination from '../components/Destination/Destination';
import Weather from '../components/Weather/Weather';
import Message from '../components/Message/Message';

const FORECAST = [];

const Dashboard = (props) => {
  const [destination, setDestination] = useState('');
  const [forecast, setForecast] = useState(FORECAST);
  const [file, setFile] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [uploadIsLoading, setUploadIsLoading] = useState(false);
  const [isUpload, setIsUpload] = useState(false);
  const [user, setUser] = useState(null);
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
       props.history.push('/')
    } else {
      axios.get('/auth', {headers: {'Authorization': token}})
      .then(res => setUser(res.data.user))
      .catch(err => props.history.push('/'));
    }
    getAvatar();

    getDestination();
  }, [props.history]);

  const getDestination = async () => {
    await axios
      .get(`users/me/destination`, {
        headers: { Authorization: localStorage.getItem('token') }
      })
      .then(res => {
        setDestination(res.data.destination);
        const userDestination = res.data.destination;
        axios
          .get(`/destination?address=${userDestination}`, {
            headers: { Authorization: localStorage.getItem('token') }
          })
          .then(res => {
            setForecast(res.data.forecast);
            setLoading(false);
          });
      })
      .catch(err => null);
  };

  const updateDestination = async () => {
    await axios
    .get(`/destination?address=${destination}`, {
      headers: { Authorization: localStorage.getItem('token') }
    })
    .then(res => {
      setForecast(res.data.forecast);
      setLoading(false);
      })
    .catch(err => setIsError(true));
  };

  const handleChangeDestination = e => {
    setDestination(e.target.value);
  };

  const handleOnSubmit = e => {
    e.preventDefault();
    setLoading(true);
    updateDestination();
  };

  const uploadHandler = (event) => {
    setFile(event.target.files[0]);
    setIsUpload(true);
  }

  const submitUploadHandler = () => {
    setUploadIsLoading(true);
    const token = localStorage.getItem('token');
    const config = {
      headers: {'Authorization':  token, 'content-type': 'multipart/form-data'}
    };
    const formData = new FormData();
    formData.append('avatar', file)
    axios.post('/users/me/avatar', formData, config)
    .then(res => {
      getAvatar();
      setUploadIsLoading(false);
      setIsUpload(false);
    })
    .catch(err => {
      setIsError(true);
      setUploadIsLoading(false);
    })
  }

  const getAvatar = () => {
    axios.get('/users/me/avatar', {headers: {'Authorization': localStorage.getItem('token')}})
      .then(res => setAvatar(res.data))
      .catch(err => console.log(err))
  }

  const logoutHandler = () => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {'Authorization':  token}
    };
    const bodyParameters = {key: 'value'}
    axios.post('/users/logout', bodyParameters, config)
      .then(res => {
        localStorage.removeItem('token');
        props.history.push('/');
      }).catch(err => setIsError(true));
  }

  let errorMessage = null;
  if (isError) {
    errorMessage = <Message error={isError}/>
      setTimeout(() => {
        setIsError(false);
      }, 1000);
  }

  return (
    <div className="">
      {errorMessage}
      <div className="container_wrap">
        <button onClick={logoutHandler} className="logout">
          Log Out
        </button>
        <Avatar
          upload={uploadHandler}
          submit={submitUploadHandler}
          avatar={avatar}
          username={user}
          isLoading={uploadIsLoading}
          isUpload={isUpload} />
        <Destination
          name={destination}
          handleOnSubmit={handleOnSubmit}
          handleChangeDestination={handleChangeDestination} />
        <Weather
          forecast={forecast}
          loading={loading}
          destination={destination} />
      </div>
    </div>
  );
};

export default Dashboard;
