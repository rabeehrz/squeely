import React, { useMemo } from 'react';
import { useTable } from 'react-table';
import DATA from './MOCK_DATA';

const COLUMNS = [
  { Header: 'Id', accessor: 'id' },
  { Header: 'Name', accessor: 'name' },
  { Header: 'Email', accessor: 'email' },
  { Header: 'Gender', accessor: 'gender' },
  { Header: 'IP Address', accessor: 'ip_address' },
  { Header: 'Vehicle', accessor: 'vehicle' },
  { Header: 'Country', accessor: 'country' },
  { Header: 'Currency', accessor: 'currency' },
];

const DataTable = () => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => DATA, []);

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
      <table
        {...getTableProps()}
        className="border-collapse border border-gray-300 max-h-full max-w-full mt-1 relative">
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
    </>
  );
};

export default DataTable;
