import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { saveAs } from 'file-saver';
import Papa from 'papaparse';
import {
  Bookmark16,
  TrashCan16,
  PlayFilled16,
  BookmarkFilled16,
  ChartHistogram16,
  DataTableReference16,
} from '@carbon/icons-react';

import Editor from '../../components/core/Editor';
import {
  updateSpace,
  executeQuery,
  toggleBookmark,
  removeQuery,
} from '../../state/ducks/spaces/actions';
import QueryTable from '../../components/crafted/QueryTable';

const Query = (props) => {
  const { spaces } = props;
  const [query, setQuery] = useState(spaces.activeSpace.currentQuery);
  const [tab, setTab] = useState('history');

  useEffect(() => {
    const timeout = setTimeout(() => {
      props.updateSpace({ ...spaces.activeSpace, currentQuery: query });
    }, 250);

    return () => clearTimeout(timeout);
  }, [query]);

  useEffect(() => {
    setQuery(spaces.activeSpace.currentQuery);
  }, [spaces.activeSpace]);

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
      <div
        className="bg-gray-fb overflow-y-scroll flex-1"
        style={{ height: '550px' }}>
        <ul className="flex space-x-5 text-secondary-250 p-4">
          <li
            className={`cursor-pointer ${
              tab === 'bookmarks' && ' text-primary'
            }`}
            onClick={() => setTab('bookmarks')}>
            <BookmarkFilled16 className="inline-block w-6 h-6" />
            <span className="text-base font-semibold ml-1">Bookmarks</span>
          </li>
          <li
            className={`cursor-pointer ${tab === 'history' && ' text-primary'}`}
            onClick={() => setTab('history')}>
            <ChartHistogram16 className="inline-block w-6 h-6" />
            <span className="text-base font-semibold ml-1">History</span>
          </li>
        </ul>
        <ul className="px-4 pt-4 text-base text-secondary font-normal">
          {spaces.activeSpace.queries
            ?.filter((_query) =>
              tab === 'bookmarks' ? _query.bookmarked : true,
            )
            .map((__query) => (
              <li
                key={__query.id}
                className="bg-white py-2 px-4 mb-2 border border-gray-200 rounded hover:border-2 hover:border-primary cursor-pointer">
                <span
                  onClick={() => {
                    props.updateSpace({
                      ...spaces.activeSpace,
                      currentQuery: __query.text,
                    });
                  }}>
                  <span className="text-xs font-bold text-secondary-250 leading-none">
                    by Bruce Wayne
                  </span>
                  <p>{__query.text}</p>
                </span>
                <div className="flex mt-1 items-center space-x-2">
                  <>
                    {__query.bookmarked === true ? (
                      <BookmarkFilled16
                        className="h-5 w-5 text-primary fill-current"
                        onClick={() =>
                          props.toggleBookmark(spaces.activeSpace, __query)
                        }
                      />
                    ) : (
                      <Bookmark16
                        className="h-5 w-5 text-primary fill-current"
                        onClick={() =>
                          props.toggleBookmark(spaces.activeSpace, __query)
                        }
                      />
                    )}
                  </>
                  <TrashCan16
                    onClick={() =>
                      props.removeQuery(spaces.activeSpace, __query)
                    }
                    className="h-5 w-5 text-red-500 fill-current"
                  />
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default connect((state) => state, {
  updateSpace,
  executeQuery,
  toggleBookmark,
  removeQuery,
})(Query);
