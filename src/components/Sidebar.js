import React from 'react';
import { atom, useRecoilState } from 'recoil';

import moment from 'moment';
import { head } from 'ramda';

import { weatherState } from '../atoms';

const ENDPOINT = 'http://api.openweathermap.org/data/2.5/weather';
const ENDPOINT_ONE_CALL = 'https://api.openweathermap.org/data/2.5/onecall';

const city = atom({
  key: 'city',
  default: '',
});

function fetchForecast({ lat, lon }) {
  return fetch(
    `${ENDPOINT_ONE_CALL}?lat=${lat}&lon=${lon}&exclude=minutely,hourly&units=metric&APPID=${process.env.REACT_APP_WEATHER_TOKEN}`,
  )
    .then((response) => response.json())
    .catch((error) => error);
}

const Sidebar = () => {
  const [value, setCity] = useRecoilState(city);
  const [weather, setWeather] = useRecoilState(weatherState);

  const handleTextChange = (e) => setCity(e.target.value);

  const handleKeyPress = (e) => {
    if (e.which === 13 || e.keyCode === 13) {
      fetchWeather();
    }
  };

  const fetchWeather = () => {
    setWeather((oldData) => ({ ...oldData, status: 'PENDING' }));
    fetch(`${ENDPOINT}?q=${value}&APPID=${process.env.REACT_APP_WEATHER_TOKEN}`)
      .then((response) => response.json())
      .then(({ coord }) => fetchForecast(coord))
      .then((data) => setWeather({ data, status: 'RESOLVED' }))
      .catch((error) => setWeather({ data: null, status: 'REJECTED', error }));
  };

  const current = weather && weather.data && head(weather.data.current.weather);

  return (
    <section className="m-2 flex flex-col items-center justify-center">
      <div className="relative text-center text-gray-600">
        <input
          className="bg-white w-full h-10 px-2 pl-5 border-2 border-gray-400 rounded-full text-sm focus:outline-none"
          name="serch"
          onChange={handleTextChange}
          onKeyPress={handleKeyPress}
          placeholder="Search "
          type="search"
          value={value}
        />
      </div>
      {weather.status === 'PENDING' && <span>Loading</span>}
      {weather.data && (
        <div>
          <img
            alt={current.main}
            src={`http://openweathermap.org/img/wn/${current.icon}@4x.png`}
          />
          <div className="text-center text-6xl">
            {weather.data.current.temp}
            <i className="wi wi-celsius text-x3l" />
          </div>
          <div className="text-center">
            <span className="text-3xl">
              {moment.unix(weather.data.current.dt).format('dddd')}
            </span>
            ,
            <span className="ml-2 text-3xl text-gray-500">
              {moment.unix(weather.data.current.dt).format('HH:mm')}
            </span>
          </div>
        </div>
      )}
    </section>
  );
};

Sidebar.propTypes = {};

export default Sidebar;
