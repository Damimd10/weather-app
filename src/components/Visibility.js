import React from 'react';
import { number } from 'prop-types';

import StatBox from './StatBox';

const Visibility = ({ visibility }) => (
  <StatBox title="Visibility">
    <div className="text-gray-600 flex items-center justify-center">
      <span className="m-2 text-6xl">{visibility}</span>
      <span className="text-2xl">km</span>
    </div>
  </StatBox>
);

Visibility.propTypes = {
  visibility: number.isRequired,
};

export default Visibility;
