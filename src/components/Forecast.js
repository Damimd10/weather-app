import React from 'react';
import { arrayOf, number, shape, string } from 'prop-types';

const Forecast = ({ dayName, max, min, weather }) => {
  const { description, icon } = weather[0];

  return (
    <div className="w-full overflow-hidden xl:w-1/6">
      <div className="h-full bg-white flex flex-col items-center rounded-lg overflow-hidden shadow-lg">
        <div className="px-6 pt-2">
          <p className="text-gray-600 uppercase text-2xl">{dayName}</p>
        </div>
        <div className="px-6 text-center">
          <img
            alt={description}
            src={`http://openweathermap.org/img/wn/${icon}@4x.png`}
          />
          <div className="my-3 text-center">
            <span className="inline-block rounded-full text-sm font-bold text-gray-700 mr-2">
              {max} <i className="wi wi-celsius text-base" />
            </span>
            <span className="inline-block rounded-full text-sm font-semibold text-gray-500">
              {min} <i className="wi wi-celsius text-base" />
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
      description: string.isRequired,
      icon: string.isRequired,
    }),
  ),
};

export default Forecast;
