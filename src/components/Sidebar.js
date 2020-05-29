import React from 'react';
import { atom, useRecoilState, useSetRecoilState } from 'recoil';

import { compose, groupBy, map, pipe } from 'ramda';
import moment from 'moment';

import { weatherState } from '../atoms';

const ENDPOINT = 'http://api.openweathermap.org/data/2.5/forecast';

const city = atom({
  key: 'city',
  default: '',
});

const parseResponse = (response) => {
  const parseList = pipe(
    map((forecast) => ({
      ...forecast,
      dt: moment.unix(forecast.dt),
    })),
    groupBy((forecast) => moment(forecast.dt).startOf('day').format('DD-MM-YYYY')),
  );

  return {
    ...response,
    list: parseList(response.list),
  };
};

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
    fetch(
      `${ENDPOINT}?q=${value}&units=metric&&APPID=${process.env.REACT_APP_WEATHER_TOKEN}`,
    )
      .then((response) => response.json())
      .then(parseResponse)
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
