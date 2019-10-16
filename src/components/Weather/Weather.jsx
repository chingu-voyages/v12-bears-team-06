import React from 'react';
import moment from 'moment';

import Loading from '../Loading/Loading';
import WeatherDaily from './WeatherDaily';
import './weather.scss';

const Weather = ({ forecast }) => {
  const formatDaily = () => {
    return forecast.loading ? (
      <Loading />
    ) : (
      forecast.map(daily => {
        const date = moment(daily.date).format('MM/DD');
        let icon = daily.icon;
        if(icon.includes('partly') || icon.includes('day')) {
          icon = icon.replace('partly-', '');
          icon = icon.replace('-day', '');
        }
        if(icon.includes('clear')) {
          icon = '-day-sunny';
        }
        return (
          <WeatherDaily
            key={date} 
            date={date}
            icon={icon}
            tempLow={daily.tempLow}
            tempHigh={daily.tempHigh} />
        )
      })
    );
  };

  return(
    <div className="container container_weather">
      <h2 className="">Weather Forecast</h2>
      <ul className="weather_week">
        {formatDaily()}
      </ul>
    </div>
  )
};

export default Weather;