import React, { useMemo } from 'react';
import { useTable } from 'react-table';
import { connect } from 'react-redux';
import { nanoid } from 'nanoid';

import Table from '../core/Table';
import HeadRow from '../core/HeadRow';
import BodyRow from '../core/BodyRow';
import Th from '../core/Th';
import Td from '../core/Td';

const DataTable = (props) => {
  const { spaces } = props;
  const columns = useMemo(() => spaces.activeSpace.data.columns, [
    spaces.activeSpace.data.columns,
  ]);
  const data = useMemo(() => spaces.activeSpace.data.rows, [
    spaces.activeSpace.data.rows,
  ]);

  const table = useTable({ columns, data });

  const {
    getTableProps,
    getTableBodyProps,
    prepareRow,
    headerGroups,
    rows,
  } = table;

  return (
    <>
      <div className="flex text-sm space-x-5">
        <span className="text-secondary">
          <span className="font-semibold">{data.length}</span> rows
        </span>
        <span className="text-secondary">
          <span className="font-semibold">{columns.length}</span> columns
        </span>
      </div>
      <Table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <HeadRow key={nanoid()} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th key={nanoid()} {...columns.getHeaderProps}>
                  {column.render('Header')}
                </Th>
              ))}
            </HeadRow>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <BodyRow key={nanoid()} {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <Td key={nanoid()} {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </Td>
                ))}
              </BodyRow>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default connect((state) => state, {})(DataTable);
