import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Destination from '../components/Destination/Destination';
import Weather from '../components/Weather/Weather';

const initialDestinationState = {
  name: '',
  editing: false
};

const initialForecastState = {
  data: [],
  loading: true
};

const Layout = () => {
  const [destination, setDestination] = useState(initialDestinationState);
  const [forecast, setForecast] = useState(initialForecastState);

  let baseURL = "http://localhost:3001";

  useEffect(() => {
    getAPI();
  }, []);

  const getAPI = async () => {
    await axios
      .get(`${baseURL}/destination?address=${destination.name}`)
      //.get(`http://localhost:3001/user/me/destination`)
      .then(res => res.data)
      .then(data => {
        setDestination(data.location);
        setForecast(data.forecast);
      })
      .catch(error => {
        if (error.response) {
          console.log(error.response.status);
        } else if (error.request) {
          console.log("No Destination");
        } else {
          console.log("Error", error.message);
        }
      });
  };


  const handleChangeDestination = e => {
    setDestination({
      name: e.target.value,
      editing: false
    });
    console.log("change destination");
  };

  const handleOnSubmit = e => {
    e.preventDefault();
    console.log("update destination");
    // axios
    //   .post(`${baseURL}/users/me/destination`, { destination: destination.name })
    //   .then(res => console.log(res))
    //   .catch(error => console.log("error"));
    setForecast({loading: true});
    getAPI();
  };

  return (
    <div className="">
      <div className="container_wrap">
        <Destination
          name={destination.name}
          editing={destination.editing}
          handleOnSubmit={handleOnSubmit}
          handleChangeDestination={handleChangeDestination}
        />
        <Weather forecast={forecast} />
      </div>
    </div>
  );
};

export default Layout;