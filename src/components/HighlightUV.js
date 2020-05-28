import React, { useEffect } from 'react';
import { number } from 'prop-types';
import JustGage from 'justgage';

import StatBox from './StatBox';

const HighlightUV = ({ index }) => {
  useEffect(() => {
    new JustGage({
      id: 'gauge',
      value: index,
      min: 0,
      max: 10,
      decimals: 2,
      gaugeWidthScale: 0.6,
      pointer: true,
      labelMinFontSize: 32,
      minLabelMinFontSize: 12,
      maxLabelMinFontSize: 12,
      pointerOptions: {
        toplength: -15,
        bottomlength: 10,
        bottomwidth: 12,
        color: '#8e8e93',
        stroke: '#ffffff',
        stroke_width: 3,
        stroke_linecap: 'round',
      },
    });
  });

  return (
    <StatBox title="UV Index">
      <div id="gauge" />
    </StatBox>
  );
};

HighlightUV.propTypes = {
  index: number.isRequired,
};

export default HighlightUV;
