import React from 'react';

const Table = ({ children, className, ...rest }) => (
  <table
    className={`border-collapse border border-gray-300 max-h-full w-full mt-1 relative ${
      className || ''
    }`}
    {...rest}>
    {children}
  </table>
);

export default Table;
