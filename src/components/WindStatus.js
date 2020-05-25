import React from 'react';
import { number, string } from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWind } from '@fortawesome/free-solid-svg-icons';

import StatBox from './StatBox';

const WindStatus = ({ direction, wind }) => {
  return (
    <StatBox title="Wind Status">
      <div className="flex items-center justify-center">
        <span className="m-2 text-6xl">{wind}</span>
        <span className="text-2xl">km/h</span>
      </div>
      <div>
        <FontAwesomeIcon icon={faWind} size="lg" />
        <span className="mx-2">{direction}</span>
      </div>
    </StatBox>
  );
};

WindStatus.propTypes = {
  direction: string,
  wind: number,
};

export default WindStatus;
