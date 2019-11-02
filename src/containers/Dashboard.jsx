import React, { useState, useEffect } from 'react';
import axios from '../utils/api';
import { Link } from 'react-router-dom';
import { DiGithubBadge } from 'react-icons/di';

import Avatar from '../components/Avatar/Avatar';
import Destination from '../components/Destination/Destination';
import Weather from '../components/Weather/Weather';
import Dates from '../components/Dates/Dates';
import Attractions from '../components/Attractions/Attractions';
import Message from '../components/Message/Message';
import Todos from '../components/Todos/Todos';
import Location from '../components/Location/Location';

const Dashboard = (props) => {
  const [destination, setDestination] = useState('');
  const [forecast, setForecast] = useState([]);
  const initialCurrentTodo = { id: null, desc: '', done: '' };
  const [todos, setTodos] = useState({
    todoData: [],
    loading: true,
    editing: false,
    currentTodo: initialCurrentTodo
  });
  const [attractions, setAttractions] = useState([]);
  const [file, setFile] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [uploadIsLoading, setUploadIsLoading] = useState(false);
  const [isUpload, setIsUpload] = useState(false);
  const [user, setUser] = useState(null);
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dates, setDate] = useState(null);
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });

  useEffect(() => {
    document.body.removeAttribute('style', 'overflow: hidden;');
    const token = localStorage.getItem('token');
    if (!token) {
      props.history.push('/')
    } else {
      axios.get('/auth', {headers: {'Authorization': token}})
      .then(res => setUser(res.data.user))
      .catch(err => props.history.push('/'));
    }
    getAvatar();
    getDate();
    getDestination();
  }, [props.history]);

  useEffect(() => {
    getTodos();
  }, []);

  const getDestination = async () => {
    await axios
    .get(`users/me/destination`, {
      headers: { Authorization: localStorage.getItem('token') }
    })
      .then(res => {
        if (res.data.destination === 'undefined' || '') {
          setDestination('');
          setLoading(false);
        } else {
          setDestination(res.data.destination);
          const userDestination = res.data.destination;
          axios
          .get(`/destination?address=${userDestination}`, {
            headers: { Authorization: localStorage.getItem('token') }
          })
          .then(res => {
            console.log(res.data);
            setForecast(res.data.forecast);
            setAttractions(res.data.attractions);
            setLocation({
              latitude: +res.data.latitude,
              longitude: +res.data.longitude
            });
            setLoading(false);
          });
        }
    })
    .catch(err => setLoading(false));
  };

  const updateDestination = async destination => {
    await axios
      .get(`/destination?address=${destination}`, {
        headers: { Authorization: localStorage.getItem('token') }
      })
      .then(res => {
        setForecast(res.data.forecast);
        setAttractions(res.data.attractions);
        setLocation({
          latitude: +res.data.latitude,
          longitude: +res.data.longitude
        });
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
    const userDestination = destination;
    updateDestination(userDestination);
  };

  const deleteDestinationHandler = () => {
    axios.delete('/users/me/destination', {headers: {'Authorization': localStorage.getItem('token')}})
      .then(res =>  {
        setDate(null);
        setDestination('');
      })
      .catch(err =>  setIsError(true))
  };

  const uploadHandler = (event) => {
    setFile(event.target.files[0]);
    setIsUpload(true);
  };

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
      .catch(err => setAvatar(null))
  }

  const submitDate = (date) => {
    const data = {date: date}
    axios.post('/users/me/date', data, {headers: {'Authorization': localStorage.getItem('token')}})
      .then(res => setDate(res.data.date))
      .catch(err => setDate(null))
  }

  const getDate = () => {
    axios.get('/users/me/date', {headers: {'Authorization': localStorage.getItem('token')}})
      .then(res => {
        if(res.data.date !== undefined){
          setDate(res.data.date)
        }
      })
      .catch(err => setDate(null));
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
        props.history.replace('/');
      }).catch(err => setIsError(true));
  }

  let errorMessage = null;
  if (isError) {
    errorMessage = <Message error={isError} isUpload={isUpload}/>
      setTimeout(() => {
        setIsError(false);
      }, 1000);
  }

  const getTodos = () => {
    axios.get('/todolist', {headers: {'Authorization': localStorage.getItem('token')}})
      .then(res => {
        if(res.data.length > 0) {
          setTodos({
            ...todos,
            todoData: res.data,
            loading: false,
            currentTodo: initialCurrentTodo
          });
        } else {
          setTodos({
            ...todos,
            todoData: [],
            loading: false
          });
        }
      })
      .catch(err => setTodos([null]));
  }

  const addTodo = (desc) => {
    setTodos({ ...todos, loading: true });
    axios.post('/todolist/add',
      { taskDescription: desc },
      { headers: { 'Authorization': localStorage.getItem('token') } }
    )
      .then(res => getTodos())
      .catch(err => setIsError(true));
  }

  const editTodo = todo => {
    setTodos({
      ...todos,
      editing: true,
      currentTodo: { id: todo._id, desc: todo.taskDescription, done: todo.taskDone }
    });
  }

  const updateTodo = (id, desc) => {
    setTodos({
      ...todos,
      editing: false,
      loading: true
    });
    axios.put(`/todolist/${id}`,
      { taskDescription: desc },
      { headers: { 'Authorization': localStorage.getItem('token') } }
    )
      .then(res => getTodos())
      .catch(err => setIsError(true));
  }

  const toggleTodo = (id) => {
    setTodos({ ...todos, loading: true });
    const prevTodos = { ...todos };
    const currentTodo = prevTodos.todoData.filter(todo => todo._id === id);
    axios.put(`/todolist/${id}`,
      { taskDone: !currentTodo[0].taskDone },
      { headers: { 'Authorization': localStorage.getItem('token') } }
    )
      .then(res => getTodos())
      .catch(err => setIsError(true));
  }

  const deleteTodo = (id) => {
    setTodos({ ...todos, loading: true });
    axios.delete(`/todolist/${id}`, {headers: {'Authorization': localStorage.getItem('token')}})
      .then(res => getTodos())
      .catch(err => setIsError(true));
  }

  const handleLocation = (data) => {
    setLocation(data);
  }

  return (
    <div className="board">
      {errorMessage}
      <header className="header">
        <h1 className="app_title">Travel Planning App</h1>
        <button onClick={logoutHandler} className="logout">
          Log Out
        </button>
      </header>
      <div className="container_wrap app">
        <Avatar
          upload={uploadHandler}
          submit={submitUploadHandler}
          avatar={avatar}
          username={user}
          isLoading={uploadIsLoading}
          isUpload={isUpload}/>
        <Destination
          name={destination}
          handleOnSubmit={handleOnSubmit}
          handleChangeDestination={handleChangeDestination}
          clicked={deleteDestinationHandler}/>
        <Dates
          submit={submitDate}
          date={dates} />
        <Todos
          todos={todos.todoData}
          currentTodo={todos.currentTodo}
          editing={todos.editing}
          addTodo={addTodo}
          toggleTodo={toggleTodo}
          updateTodo={updateTodo}
          editTodo={editTodo}
          deleteTodo={deleteTodo}
          loading={todos.loading} />
        <Weather
          forecast={forecast}
          loading={loading}
          destination={destination} />
        <Location
          data={location}
          loading={loading}
          handleLocation={handleLocation}
          destination={destination} />
        <Attractions
          loading={loading}
          destination={destination}
          attractions ={attractions} />
      </div>
      <footer className="footer">
        <p className="footer_logo">
          <Link to="/">Travel Planning App</Link>
        </p>
        <p className="copyright">Built by <span>Bears Team 6</span> Chingu Voyage 2019 <a href="https://github.com/chingu-voyages/v12-bears-team-06" target="_blank" className="link_git" rel="noopener noreferrer"><DiGithubBadge /></a></p>
      </footer>
    </div>
  );
};

export default Dashboard;
