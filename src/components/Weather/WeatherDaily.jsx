import React from 'react';
import './weather-icons.min.css';

const WeatherDaily = ({ date, icon, tempHigh, tempLow }) => {
    const high = tempHigh.toString().substring(0, 4);
    const low = tempLow.toString().substring(0, 4);

    return (
      <li className="weather_daily">
        <p className="weather_date">{date}</p>
        <p className="weather_icon"><i className={`wi wi-${icon}`}></i></p>
        <p className="weather_temps">{high}<span>°C</span> / {low}<span>°C</span></p>
      </li>
    );
}


export default WeatherDaily;
