import React from 'react';
import { number } from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWind } from '@fortawesome/free-solid-svg-icons';

import StatBox from './StatBox';

const DEGS = [0, 23, 45, 68, 90, 113, 135, 158, 180, 203, 225, 248, 270, 293, 313, 336];

const WindStatus = ({ deg, speed }) => {
  const calculatedDeg = DEGS.reduce((prev, curr) =>
    Math.abs(curr - deg) < Math.abs(prev - deg) ? curr : prev,
  );

  return (
    <StatBox title="Wind Status">
      <div className="text-gray-600 flex items-center justify-center">
        <span className="m-2 text-6xl">{speed}</span>
        <span className="text-2xl">km/h</span>
      </div>
      <div className="flex items-center">
        <i
          className={`wi wi-wind towards-${calculatedDeg}-deg`}
          style={{ fontSize: '2rem' }}
        />
        <span className="ml-2">{deg}</span>
      </div>
    </StatBox>
  );
};

WindStatus.propTypes = {
  deg: number,
  speed: number,
};

export default WindStatus;
