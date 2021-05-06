import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { saveAs } from 'file-saver';
import Papa from 'papaparse';
import { PlayFilled16, DataTableReference16 } from '@carbon/icons-react';

import Editor from '../../components/core/Editor';
import { updateSpace, executeQuery } from '../../state/ducks/spaces/actions';
import QueryTable from '../../components/crafted/QueryTable';
import Bookmarks from './Bookmarks';

const Query = (props) => {
  const { spaces } = props;
  const [query, setQuery] = useState(spaces.activeSpace.currentQuery);

  useEffect(() => {
    // Update the state only every 250ms
    const timeout = setTimeout(() => {
      props.updateSpace({ ...spaces.activeSpace, currentQuery: query });
    }, 250);

    return () => clearTimeout(timeout);
  }, [query]);

  useEffect(() => {
    setQuery(spaces.activeSpace.currentQuery);
  }, [spaces.activeSpace]);

  // Export Parsers
  const exportCSV = () => {
    const { columns, rows } = spaces.activeSpace.qData;
    const cleanedColumns = columns.map((column) => column.Header);
    const cleanedRows = rows.map((row) => Object.values(row));

    const csv = Papa.unparse([[...cleanedColumns], ...cleanedRows]);
    const csvData = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(csvData, 'queryCSV.csv');
  };

  const exportJSON = () => {
    const { rows } = spaces.activeSpace.qData;
    const jsonBlob = new Blob([JSON.stringify(rows, null, 2)], {
      type: 'application/json',
    });
    saveAs(jsonBlob, 'queryJSON.json');
  };

  return (
    <div className="mt-4 flex justify-between space-x-5 h-full">
      <div className="flex-col space-y-2 flex-1 max-w-2xl ">
        <Editor value={query} onChange={setQuery} />
        <div className="flex items-center">
          <button
            type="button"
            className="text-xs py-1.5 px-2.5 flex items-center bg-white text-secondary rounded hover:bg-gray-100 font-medium"
            onClick={exportCSV}>
            <DataTableReference16 className="fill-current mr-1.5" />
            <span>Export as CSV</span>
          </button>
          <button
            type="button"
            className="text-xs py-1.5 px-2.5 flex items-center bg-white text-secondary rounded hover:bg-gray-100 font-medium"
            onClick={exportJSON}>
            <DataTableReference16 className="fill-current mr-1.5" />
            <span>Export as JSON</span>
          </button>
          <div className="flex text-sm space-x-5">
            <span className="text-secondary">
              <span className="font-semibold">
                {spaces.activeSpace.qData.rows.length}
              </span>{' '}
              rows
            </span>
            <span className="text-secondary">
              <span className="font-semibold">
                {spaces.activeSpace.qData.columns.length}
              </span>{' '}
              columns
            </span>
          </div>
          <button
            type="button"
            className="text-xs ml-auto py-1.5 px-2.5 flex items-center bg-primary text-white rounded hover:bg-primary-dark font-medium"
            onClick={() => {
              if (query === '') return;
              props.executeQuery(spaces.activeSpace);
            }}>
            <PlayFilled16 className="fill-current mr-1.5" />
            <span>Run Query</span>
          </button>
        </div>

        <div className="overflow-scroll flex-1" style={{ height: '225px' }}>
          <QueryTable
            columns={spaces.activeSpace.qData.columns}
            data={spaces.activeSpace.qData.rows}
          />
        </div>
      </div>
      <Bookmarks />
    </div>
  );
};

export default connect((state) => state, {
  updateSpace,
  executeQuery,
})(Query);
