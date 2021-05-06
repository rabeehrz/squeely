import React from 'react';

const BodyRow = ({ children, className, ...rest }) => (
  <tr
    className={`text-sm text-gray-500 hover:text-secondary ${className || ''}`}
    {...rest}>
    {children}
  </tr>
);

export default BodyRow;
