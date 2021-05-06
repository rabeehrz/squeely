import React from 'react';

const HeadRow = ({ children, className, ...rest }) => (
  <tr className={`font-semibold text-sm ${className || ''}`} {...rest}>
    {children}
  </tr>
);

export default HeadRow;
