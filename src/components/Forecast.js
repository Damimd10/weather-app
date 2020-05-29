import React from 'react';
import { instanceOf, number, shape, string } from 'prop-types';

import moment from 'moment';

import weatherIcons from '../icons.json';

const Forecast = ({ dt, main, weather }) => {
  const code = weather[0].id;
  const icon = weatherIcons[code].icon;

  return (
    <div className="w-full overflow-hidden lg:my-1 lg:px-1 lg:w-1/6 xl:my-1 xl:px-1 xl:w-1/6">
      <div className="max-w-sm h-full bg-white flex flex-col items-center rounded-lg overflow-hidden shadow-lg">
        <div className="px-6 py-2">
          <p className="text-gray-600 uppercase text-2xl">{moment(dt).format('dddd')}</p>
        </div>
        <div className="px-6 py-4 text-center">
          <i className={`wi wi-day-${icon}`} style={{ fontSize: '5rem' }} />
          <div className="my-3 text-center">
            <span className="inline-block rounded-full text-sm font-bold text-gray-700 mr-2">
              {main.temp_max} <i className="wi wi-celsius" style={{ fontSize: '1rem' }} />
            </span>
            <span className="inline-block rounded-full text-sm font-semibold text-gray-500">
              {main.temp_min} <i className="wi wi-celsius" style={{ fontSize: '1rem' }} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

Forecast.propTypes = {
  dt: instanceOf(moment),
  main: shape({
    temp_min: number,
    temp_max: number,
  }),
  weather: shape({
    icon: string.isRequired,
  }),
};

export default Forecast;
