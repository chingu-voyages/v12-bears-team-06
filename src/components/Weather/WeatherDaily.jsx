import React from 'react';
import './weather-icons.min.css';

const WeatherDaily = ({ date, icon, tempHigh, tempLow }) => (
  <li className="weather_daily">
    <p className="weather_date">{date}</p>
    <p className="weather_icon"><i className={`wi wi-${icon}`}></i></p>
    <p className="weather_temps">{tempLow}<span>&#8451;</span> / {tempHigh}<span>&#8451;</span></p>
  </li>
);

export default WeatherDaily;