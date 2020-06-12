import React from 'react';
import { number } from 'prop-types';

import StatBox from './StatBox';

const DEGS = [0, 23, 45, 68, 90, 113, 135, 158, 180, 203, 225, 248, 270, 293, 313, 336];

const WindStatus = ({ deg, speed }) => {
  const calculatedDeg = DEGS.reduce((prev, curr) =>
    Math.abs(curr - deg) < Math.abs(prev - deg) ? curr : prev,
  );

  return (
    <StatBox title="Wind Status">
      <div className="text-gray-600 mt-auto flex items-center justify-center">
        <span className="m-2 text-6xl">{speed}</span>
        <span className="text-2xl">km/h</span>
      </div>
      <div className="flex items-center mt-auto">
        <i
          className={`wi wi-wind towards-${calculatedDeg}-deg text-4xl text-indigo-600`}
        />
        <span className="ml-2 text-gray-600 text-xl">{deg}&#176;</span>
      </div>
    </StatBox>
  );
};

WindStatus.propTypes = {
  deg: number,
  speed: number,
};

export default WindStatus;
