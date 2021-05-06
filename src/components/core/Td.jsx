import React from 'react';

const Td = ({ children, className, ...rest }) => (
  <td
    className={`p-2 border-b border-r border-gray-300 ${className || ''}`}
    {...rest}>
    {children}
  </td>
);

export default Td;
