import React from 'react';
import { take } from 'ramda';
import { selector, useRecoilValueLoadable } from 'recoil';

import moment from 'moment';

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

    const { current, daily } = response;

    return {
      current,
      daily,
    };
  },
});

const Content = () => {
  const { contents, state } = useRecoilValueLoadable(currentForecast);

  if (!contents) return null;
  if (state === 'loading') return <span>Loading...</span>;
  if (state === 'hasError') return <span>Error</span>;

  const { current, daily } = contents;

  const [_, ...forecast] = daily;

  return (
    <main>
      <div className="flex flex-wrap overflow-hidden m-2">
        {take(6, forecast).map((day) => (
          <Forecast
            key={day.dt}
            dayName={moment.unix(day.dt).format('dddd')}
            weather={day.weather}
            {...day.temp}
          />
        ))}
      </div>
      <div className="my-2 flex flex-wrap justify-center mx-1 overflow-hidden sm:-mx-1 md:-mx-1 lg:-mx-1 xl:mx-1">
        <HighlightUV index={current.uvi} />
        <WindStatus deg={current.wind_deg} speed={current.wind_speed} />
        <Astro sunrise={current.sunrise} sunset={current.sunset} />
      </div>
      <div className="my-2 flex flex-wrap justify-center mx-1 overflow-hidden sm:-mx-1 md:-mx-1 lg:-mx-1 xl:mx-1">
        <Humidity humidity={current.humidity} />
        <Visibility visibility={current.visibility / 1000} />
      </div>
    </main>
  );
};

export default Content;
