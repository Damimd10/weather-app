import React from 'react';
import { atom, useRecoilState, useSetRecoilState } from 'recoil';

import { weatherState } from '../atoms';

const ENDPOINT = 'http://api.weatherapi.com/v1/forecast.json';

const city = atom({
  key: 'city',
  default: null,
});

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
    fetch(`${ENDPOINT}?key=${process.env.REACT_APP_WEATHER_TOKEN}&q=${value}&days=7`)
      .then((response) => response.json())
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
