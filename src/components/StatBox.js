import React from 'react';
import { node, string } from 'prop-types';

const StatBox = ({ children, title }) => (
  <div className="max-w-md w-1/4 bg-white flex flex-col rounded-lg overflow-hidden shadow-lg px-3 py-1 m-2">
    <span className="font-semi-bold text-gray-500 self-start">{title}</span>
    {children}
  </div>
);

StatBox.propTypes = {
  children: node.isRequired,
  title: string.isRequired,
};

export default StatBox;
