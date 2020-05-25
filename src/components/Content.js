import React from 'react';
import { selector, useRecoilValueLoadable } from 'recoil';

import { weatherState } from '../atoms';

import Forecast from './Forecast';

const currentForecast = selector({
  key: 'CurrentForecast',
  get: async ({ get }) => {
    const response = await get(weatherState);
    return response.forecast.forecastday;
  },
});

const Content = () => {
  const { contents, state } = useRecoilValueLoadable(currentForecast);

  return (
    <main>
      <div className="my-2 flex justify-center mb-4">
        {state === 'hasValue' &&
          contents.map((forecast) => (
            <Forecast key={forecast.date_epoch} {...forecast} />
          ))}
      </div>
    </main>
  );
};

export default Content;
