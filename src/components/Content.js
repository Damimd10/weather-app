import React from 'react';
import { head } from 'ramda';
import { selector, useRecoilValueLoadable } from 'recoil';

import { weatherState } from '../atoms';

import Astro from './Astro';
import Forecast from './Forecast';
import Humidity from './Humidity';
import HighlightUV from './HighlightUV';
import Visibility from './Visibility';
import WindStatus from './WindStatus';

const currentForecast = selector({
  key: 'CurrentForecast',
  get: async ({ get }) => {
    const response = await get(weatherState);

    if (!response) return null;

    console.log('HERE', response);

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
      <div className="my-2 flex justify-center flex-wrap">
        <Humidity humidity={current.humidity} />
        <Visibility visibility={current.vis_km} />
      </div>
    </main>
  );
};

export default Content;
