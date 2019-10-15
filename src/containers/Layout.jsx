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
      const { data } = await axios.get(`http://localhost:3001/destination?address=Bangkok`)
      .catch(error => console.log('error'));
      //console.log(data.forecast, data, 'Layout.js');
      setDestination(data.location);
      setForecast(data.forecast);
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