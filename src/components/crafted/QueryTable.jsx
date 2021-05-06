import React from 'react';
import { useTable } from 'react-table';
import { connect } from 'react-redux';

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
    <table
      {...getTableProps()}
      className="border-collapse border border-gray-300 max-h-full mt-1 relative overflow-scroll">
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr
            {...headerGroup.getHeaderGroupProps()}
            className="font-semibold text-sm">
            {headerGroup.headers.map((column) => (
              <th
                {...columns.getHeaderProps}
                className="p-2 border-b border-r border-gray-300 text-secondary sticky">
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr
              {...row.getRowProps()}
              className="text-sm text-gray-500 hover:text-secondary">
              {row.cells.map((cell) => (
                <td
                  {...cell.getCellProps()}
                  className="p-2 border-b border-r border-gray-300">
                  {cell.render('Cell')}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default connect((state) => state, {})(DataTable);
