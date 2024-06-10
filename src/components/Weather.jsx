import React, { useState } from 'react';
import axios from 'axios';
import Loader from 'react-loader-spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFrown } from '@fortawesome/free-solid-svg-icons';
import { Circles } from 'react-loader-spinner';


function Weather({ theme }) {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({
    loading: false,
    data: {},
    error: false,
  });
  
  const toDate = () => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December',
    ];
    const days = [
      'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',
    ];
    const currentDate = new Date();
    const date = `${days[currentDate.getDay()]} ${currentDate.getDate()} ${
      months[currentDate.getMonth()]
    }`;
    const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const time = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
  return `${date} ${time}`;
  };



  const search = async (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      setQuery('');
      setWeather({ ...weather, loading: true });
      const url = 'https://api.openweathermap.org/data/2.5/weather';
      const appid = 'f00c38e0279b7bc85480c3fe775d518c';
      await axios
        .get(url, {
          params: {
            q: query,
            units: 'metric',
            appid: appid,
          },
        })
        .then((res) => {
          setWeather({ data: res.data, loading: false, error: false });
        })
        .catch((error) => {
          setWeather({ ...weather, data: {}, error: true });
          setQuery('');
        });
    }
  };

  return (
    <div className={`weather-container ${theme}`}>
      <h1 className="app-name">
        Weather App<span role="img" aria-label="sun">🌤</span>
      </h1>
      <div className="search-bar">
        <input
          type="text"
          className="city-search"
          placeholder="Search City.."
          name="query"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyPress={search}
        />
      </div>
     

      {weather.loading && (
        <>
          <br />
          <br />
          <Circles color="#00BFFF" height={80} width={80} />

        </>
      )}
      {weather.error && (
        <>
          <br />
          <br />
          <span className="error-message">
            <FontAwesomeIcon icon={faFrown} />
            <span style={{ fontSize: '20px' }}> Sorry, City not found</span>
          </span>
        </>
      )}

      {weather.data && weather.data.main && (
        <div>
          <div className="city-name">
            <h2>
              {weather.data.name}, <span>{weather.data.sys.country}</span>
            </h2>
          </div>
          <div className="date">
            <span>{toDate()}</span>
          </div>
          <div className="icon-temp">
            <img
              src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`}
              alt={weather.data.weather[0].description}
            />
            {Math.round(weather.data.main.temp)}
            <sup className="deg">&deg;C</sup>
          </div>
          <div className="des-wind">
            <p>{weather.data.weather[0].description.toUpperCase()}</p>
            <p>Speed: Wind {weather.data.wind.speed} m/s</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Weather;
