import React from 'react';
import { string } from 'prop-types';

const Error = ({ message }) => (
  <div role="alert">
    <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">Error!</div>
    <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
      <p>{message}</p>
    </div>
  </div>
);

Error.propTypes = {
  message: string.isRequired,
};

export default Error;
