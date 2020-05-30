import React from 'react';
import { number } from 'prop-types';

import StatBox from './StatBox';

const Pressure = ({ pressure }) => (
  <StatBox title="Pressure">
    <div className="text-gray-600 flex items-center justify-center">
      <span className="m-2 text-6xl">{pressure}</span>
      <i className="wi wi-barometer text-4xl" />
    </div>
  </StatBox>
);

Pressure.propTypes = {
  pressure: number,
};

export default Pressure;
