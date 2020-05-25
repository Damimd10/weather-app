import React, { useState } from 'react';
import { atom, useRecoilState } from 'recoil';

const ENDPOINT = 'http://api.weatherapi.com/v1/forecast.json';

const weatherState = atom({
  key: 'forecast',
  default: {
    status: 'IDLE',
    data: null,
    error: null,
  },
});

const Sidebar = () => {
  const [city, setCity] = useState();
  const [weather, setWeather] = useRecoilState(weatherState);

  const handleTextChange = (e) => setCity(e.target.value);

  const handleKeyPress = (e) => {
    if (e.which === 13 || e.keyCode === 13) {
      fetchWeather();
    }
  };

  const fetchWeather = () => {
    setWeather((state) => ({
      ...state,
      status: 'PENDING',
    }));

    fetch(`${ENDPOINT}?key=${process.env.REACT_APP_WEATHER_TOKEN}&q=${city}&days=7`)
      .then((response) => response.json())
      .then((data) =>
        setWeather((state) => ({ ...state, status: 'RESOLVED', data, error: null })),
      )
      .catch((error) =>
        setWeather((state) => ({ ...state, status: 'REJECTED', data: null, error })),
      );
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
          value={city}
        />
      </div>
    </section>
  );
};

Sidebar.propTypes = {};

export default Sidebar;
