import React from 'react';
import { node, string } from 'prop-types';

const StatBox = ({ children, title }) => (
  <div className="my-1 mx-3 px-1 w-full overflow-hidden sm:my-2 sm:px-2 md:my-1 md:px-1 lg:my-1 lg:px-1 xl:my-2 xl:px-2 xl:w-1/4 bg-white flex flex-col rounded-lg overflow-hidden shadow-lg px-3 py-1">
    <span className="uppercase font-semi-bold text-gray-500 self-start">{title}</span>
    {children}
  </div>
);

StatBox.propTypes = {
  children: node.isRequired,
  title: string.isRequired,
};

export default StatBox;
