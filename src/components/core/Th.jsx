import React from 'react';

const Th = ({ children, className, ...rest }) => (
  <th
    className={`p-2 border-b border-r border-gray-300 text-secondary sticky ${
      className || ''
    }`}
    {...rest}>
    {children}
  </th>
);

export default Th;
