import React from 'react';

const getDayName = (strDate) => {
  const date = new Date(strDate);
  return date.toLocaleDateString('en-EN', { weekday: 'long' });
};

const Forecast = ({ date, day }) => {
  return (
    <div className="px-2 h-full h-12">
      <div className="max-w-sm h-full bg-white flex flex-col items-center justify-center rounded-lg overflow-hidden shadow-lg">
        <div className="px-6 py-2">
          <p className="text-gray-700 text-2xl">{getDayName(date)}</p>
        </div>
        <div className="px-6 py-4">
          <div className="inline-block rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
            <img alt="weather" src={day.condition.icon.replace('64x64', '128x128')} />
          </div>
          <div className="text-center">
            <span className="inline-block rounded-full px-3 py-1 text-sm font-bold text-gray-700 mr-2">
              {day.maxtemp_c}&#176;
            </span>
            <span className="inline-block rounded-full px-3 py-1 text-sm font-semibold text-gray-500">
              {day.mintemp_c}&#176;
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forecast;
