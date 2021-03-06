import React from 'react';
import { number } from 'prop-types';

import StatBox from './StatBox';

const Humidity = ({ humidity }) => (
  <StatBox title="Humidity">
    <div className="text-gray-600 flex items-center justify-center">
      <span className="m-2 text-6xl">{humidity}</span>
      <i className="wi wi-humidity text-2xl" />
    </div>
  </StatBox>
);

Humidity.propTypes = {
  humidity: number.isRequired,
};

export default Humidity;
