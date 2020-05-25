import React from 'react';
import { string } from 'prop-types';

import StatBox from './StatBox';

import sunriseIcon from '../assets/sunrise-40.png';
import sunsetIcon from '../assets/sunset-40.png';

const Astro = ({ sunrise, sunset }) => {
  return (
    <StatBox title="Sunrise & Sunset">
      <section className="h-full flex flex-col justify-center">
        <div className="m-2 flex items-center justify-center">
          <img src={sunriseIcon} style={{ height: '40px' }} />
          <span className="mx-2 text-lg">{sunrise}</span>
        </div>
        <div className="m-2 flex items-center justify-center">
          <img src={sunsetIcon} style={{ height: '40px' }} />
          <span className="mx-2 text-lg">{sunset}</span>
        </div>
      </section>
    </StatBox>
  );
};

Astro.propTypes = {
  sunrise: string,
  sunset: string,
};

export default Astro;
