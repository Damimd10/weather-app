import React from 'react';
import { number } from 'prop-types';

import moment from 'moment';

import StatBox from './StatBox';

const Astro = ({ sunrise, sunset }) => {
  return (
    <StatBox title="Sunrise & Sunset">
      <section className="text-gray-600 h-full flex flex-col justify-center">
        <div className="m-2 flex items-center justify-center">
          <i className="wi wi-sunrise" style={{ fontSize: '3rem' }} />
          <span className="mx-2 text-lg">{moment.unix(sunrise).format('HH:mm A')}</span>
        </div>
        <div className="m-2 flex items-center justify-center">
          <i className="wi wi-sunset" style={{ fontSize: '3rem' }} />
          <span className="mx-2 text-lg">{moment.unix(sunset).format('HH:mm A')}</span>
        </div>
      </section>
    </StatBox>
  );
};

Astro.propTypes = {
  sunrise: number,
  sunset: number,
};

export default Astro;
