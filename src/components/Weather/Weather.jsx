import React from 'react';
import moment from 'moment';

import Loading from '../Loading/Loading';
import WeatherDaily from './WeatherDaily';
import './weather.scss';

const Weather = ({ forecast, loading, destination }) => {
  const formatDaily = () => {
    return forecast.map(dailyItem => {
      const date = moment(dailyItem.date).format('MM/DD');
      let icon = dailyItem.icon;
      if (icon.includes('partly') || icon.includes('day')) {
        icon = icon.replace('partly-', '');
        icon = icon.replace('-day', '');
      }
      if (icon.includes('clear')) {
        icon = 'day-sunny';
      }
      return (
        <WeatherDaily
          key={date}
          date={date}
          icon={icon}
          tempLow={dailyItem.tempLow}
          tempHigh={dailyItem.tempHigh} />
      );
    });
  };

  let daily = loading ? <Loading /> : destination ? <Loading /> : <p className="msg_nodestination">You don't have Destination.</p>;

  if (destination && !loading && forecast) {
    daily = <ul className="weather_week">{formatDaily()}</ul>;
  };

  return (
    <div className="container container_weather">
      <h2 className="">Weather Forecast</h2>
      {daily}
    </div>
  );
};

export default Weather;
