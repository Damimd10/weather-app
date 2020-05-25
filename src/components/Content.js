import React from 'react';
import { head } from 'ramda';
import { selector, useRecoilValueLoadable } from 'recoil';

import { weatherState } from '../atoms';

import Astro from './Astro';
import Forecast from './Forecast';
import HighlightUV from './HighlightUV';
import WindStatus from './WindStatus';

const currentForecast = selector({
  key: 'CurrentForecast',
  get: async ({ get }) => {
    const response = await get(weatherState);

    if (!response) return null;

    const { current, forecast } = response;

    return {
      current,
      forecast: forecast.forecastday,
    };
  },
});

const Content = () => {
  const { contents, state } = useRecoilValueLoadable(currentForecast);

  if (!contents) return null;
  if (state === 'loading') return <span>Loading...</span>;
  if (state === 'hasError') return <span>Error</span>;

  const { current, forecast } = contents;

  console.log('HERE', contents);

  return (
    <main>
      <div className="my-2 flex justify-center mb-4">
        {forecast.map((current) => (
          <Forecast key={current.date_epoch} {...current} />
        ))}
      </div>
      <div className="my-2 flex justify-center flex-wrap">
        <HighlightUV index={current.uv} />
        <WindStatus wind={current.wind_kph} direction={current.wind_dir} />
        <Astro {...head(forecast).astro} />
      </div>
    </main>
  );
};

export default Content;
