import React from 'react';
import { selector, useRecoilValueLoadable } from 'recoil';

import { weatherState } from '../atoms';

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

  console.log('HERE', contents);

  const { current, forecast } = contents;

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
      </div>
    </main>
  );
};

export default Content;
