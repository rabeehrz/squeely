import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  PlayFilledAlt16,
  Bookmark16,
  TrashCan16,
  BookmarkFilled16,
  ChartHistogram16,
} from '@carbon/icons-react';

import Editor from '../../components/core/Editor';
import {
  updateSpace,
  executeQuery,
  toggleBookmark,
} from '../../state/ducks/spaces/actions';

const Query = (props) => {
  const { spaces } = props;
  const [query, setQuery] = useState(spaces.activeSpace.currentQuery);
  const [tab, setTab] = useState('bookmarks');

  useEffect(() => {
    const timeout = setTimeout(() => {
      props.updateSpace({ ...spaces.activeSpace, currentQuery: query });
    }, 250);

    return () => clearTimeout(timeout);
  }, [query]);

  useEffect(() => {
    setQuery(spaces.activeSpace.currentQuery);
  }, [spaces.activeSpace]);

  return (
    <div className="mt-4 flex justify-between space-x-5 self-stretch">
      <div className="flex-col space-y-2 flex-1 max-w-2xl">
        <Editor value={query} onChange={setQuery} />
        <button
          type="button"
          className="text-xs ml-auto py-1.5 px-2.5 flex items-center bg-primary text-white rounded hover:bg-primary-dark font-medium"
          onClick={() => props.executeQuery(spaces.activeSpace)}>
          <PlayFilledAlt16 className="fill-current mr-1.5" />
          <span>Run Query</span>
        </button>
      </div>
      <div className="bg-gray-fb flex-1 self-stretch">
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
        <ul className="px-4 pt-4 text-base text-secondary font-normal h-60 overflow-y-scroll">
          {spaces.activeSpace?.queries
            ?.filter((_query) =>
              tab === 'bookmarks' ? _query.bookmarked : true,
            )
            .map((__query) => (
              <li
                key={__query.id}
                className="bg-white py-2 px-4 mb-2 border border-gray-200 rounded hover:border-2 hover:border-primary cursor-pointer">
                <div>
                  <span className="text-xs font-bold text-secondary-250 leading-none">
                    by Bruce Wayne
                  </span>
                  <p>{__query.text}</p>
                </div>
                <div className="flex mt-1 items-center">
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
                  <TrashCan16 className="h-5 w-5 text-red-500 fill-current" />
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
})(Query);
