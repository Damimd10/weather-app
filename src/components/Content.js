import React from 'react';
import { take } from 'ramda';
import { selector, useRecoilValueLoadable } from 'recoil';

import ReactLoading from 'react-loading';
import moment from 'moment';

import { weatherState } from '../atoms';

import Astro from './Astro';
import Error from './Error';
import Forecast from './Forecast';
import Humidity from './Humidity';
import HighlightUV from './HighlightUV';
import Pressure from './Pressure';
import Visibility from './Visibility';
import WindStatus from './WindStatus';

const currentForecast = selector({
  key: 'CurrentForecast',
  get: async ({ get }) => {
    const response = await get(weatherState);

    if (!response.data)
      return {
        status: response.status,
      };

    const { current, daily } = response.data;

    return {
      current,
      daily,
      status: response.status,
    };
  },
});

const Content = () => {
  const { contents, state } = useRecoilValueLoadable(currentForecast);

  if (contents.status === 'IDLE' || !contents.status) return null;
  if (contents.status === 'PENDING')
    return (
      <div className="h-64 flex justify-center items-center">
        <ReactLoading type="spin" color="black" height={100} width={100} />
      </div>
    );

  if (contents.status === 'REJECTED')
    return (
      <div className="h-64 flex justify-center items-center">
        <Error message="We couldn't find the city" />
      </div>
    );

  const { current, daily } = contents;

  const [_, ...forecast] = daily;

  return (
    <main className="mt-2">
      <div className="w-full flex flex-wrap justify-center space-x-3 space-y-2 overflow-hidden">
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
        <Pressure pressure={current.pressure} />
      </div>
    </main>
  );
};

export default Content;
