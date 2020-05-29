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

    const { city, list } = response;

    return {
      city,
      list,
    };
  },
});

const Content = () => {
  const { contents, state } = useRecoilValueLoadable(currentForecast);

  if (!contents) return null;
  if (state === 'loading') return <span>Loading...</span>;
  if (state === 'hasError') return <span>Error</span>;

  const { city, list } = contents;

  const forecastSorted = Object.keys(list).sort((a, b) => new Date(b) - new Date(a));

  console.log('HERE', list[forecastSorted[0]][0]);

  return (
    <main>
      <div className="flex flex-wrap overflow-hidden m-2">
        {forecastSorted.map((day) => (
          <Forecast key={list[day][0].dt_txt} {...list[day][0]} />
        ))}
      </div>
      <div className="my-2 flex flex-wrap justify-center mx-1 overflow-hidden sm:-mx-1 md:-mx-1 lg:-mx-1 xl:mx-1">
        {/* <HighlightUV index={current.uv} /> <Astro {...head(forecast).astro} /><Humidity humidity={current.humidity} />
        <Visibility visibility={current.vis_km} /> */}
        <WindStatus {...list[forecastSorted[0]][0].wind} />
        <Astro sunrise={city.sunrise} sunset={city.sunset} />
      </div>
      <div className="my-2 flex flex-wrap justify-center mx-1 overflow-hidden sm:-mx-1 md:-mx-1 lg:-mx-1 xl:mx-1">
        <span>Hi</span>
      </div>
    </main>
  );
};

export default Content;
