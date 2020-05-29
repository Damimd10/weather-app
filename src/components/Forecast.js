import React from 'react';
import { arrayOf, number, shape, string } from 'prop-types';

import weatherIcons from '../icons.json';

const Forecast = ({ dayName, max, min, weather }) => {
  const code = weather[0].id;
  const icon = weatherIcons[code].icon;

  return (
    <div className="w-full overflow-hidden lg:my-1 lg:px-1 lg:w-1/6 xl:my-1 xl:px-1 xl:w-1/6">
      <div className="max-w-sm h-full bg-white flex flex-col items-center rounded-lg overflow-hidden shadow-lg">
        <div className="px-6 py-2">
          <p className="text-gray-600 uppercase text-2xl">{dayName}</p>
        </div>
        <div className="px-6 py-4 text-center">
          <i className={`wi wi-day-${icon}`} style={{ fontSize: '5rem' }} />
          <div className="my-3 text-center">
            <span className="inline-block rounded-full text-sm font-bold text-gray-700 mr-2">
              {max} <i className="wi wi-celsius" style={{ fontSize: '1rem' }} />
            </span>
            <span className="inline-block rounded-full text-sm font-semibold text-gray-500">
              {min} <i className="wi wi-celsius" style={{ fontSize: '1rem' }} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

Forecast.propTypes = {
  dayName: string,
  min: number,
  max: number,
  weather: arrayOf(
    shape({
      icon: string.isRequired,
    }),
  ),
};

export default Forecast;
