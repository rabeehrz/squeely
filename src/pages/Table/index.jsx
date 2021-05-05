import React from 'react';
import DataTable from '../../components/crafted/DataTable';

const Table = () => {
  return (
    <div
      className="mt-4 overflow-x-scroll overflow-y-scroll"
      style={{ width: '724px', height: '500px' }}>
      <DataTable />
    </div>
  );
};

export default Table;
