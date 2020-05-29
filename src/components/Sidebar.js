import React from 'react';
import { atom, useRecoilState, useSetRecoilState } from 'recoil';

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
  const setWeather = useSetRecoilState(weatherState);

  const handleTextChange = (e) => setCity(e.target.value);

  const handleKeyPress = (e) => {
    if (e.which === 13 || e.keyCode === 13) {
      fetchWeather();
    }
  };

  const fetchWeather = () => {
    fetch(`${ENDPOINT}?q=${value}&APPID=${process.env.REACT_APP_WEATHER_TOKEN}`)
      .then((response) => response.json())
      .then(({ coord }) => fetchForecast(coord))
      .then(setWeather)
      .catch((error) => error);
  };

  return (
    <section className="m-2">
      <div className="relative text-center text-gray-600">
        <input
          className="bg-white w-4/5 h-10 px-5 pr-10 rounded-full text-sm focus:outline-none"
          name="serch"
          onChange={handleTextChange}
          onKeyPress={handleKeyPress}
          placeholder="Search"
          type="search"
          value={value}
        />
      </div>
    </section>
  );
};

Sidebar.propTypes = {};

export default Sidebar;
