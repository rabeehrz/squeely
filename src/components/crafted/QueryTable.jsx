import React from 'react';
import { useTable } from 'react-table';
import { connect } from 'react-redux';

import Table from '../core/Table';
import HeadRow from '../core/HeadRow';
import BodyRow from '../core/BodyRow';
import Th from '../core/Th';
import Td from '../core/Td';

const DataTable = (props) => {
  const { columns, data } = props;
  const table = useTable({ columns, data });

  const {
    getTableProps,
    getTableBodyProps,
    prepareRow,
    headerGroups,
    rows,
  } = table;

  return (
    <Table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <HeadRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <Th {...columns.getHeaderProps}>{column.render('Header')}</Th>
            ))}
          </HeadRow>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <BodyRow {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>
              ))}
            </BodyRow>
          );
        })}
      </tbody>
    </Table>
  );
};

export default connect((state) => state, {})(DataTable);
