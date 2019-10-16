import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Destination from '../components/Destination';
import Weather from '../components/Weather/Weather';

const initialForecastState = {
  forecast: [],
  loading: true
}

const Layout = () => {
  const [destination, setDestination] = useState('');
  const [forecast, setForecast] = useState(initialForecastState);

  useEffect(() => {
    const getAPI = async () => {
      await axios
        .get(`http://localhost:3001/destination?address=Toyko`)
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
    getAPI();
  }, []);

  const handleChangeDestination = (e) => {
    setDestination(e.target.value);
  }

  return (
    <div className="">
      <div className="container_wrap">
        <Destination
          destination={destination}
          handleChangeDestination={handleChangeDestination} />
        <Weather forecast={forecast} />
      </div>
    </div>
  );
}

export default Layout;