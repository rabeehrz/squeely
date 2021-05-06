import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  BookmarkFilled16,
  ChartHistogram16,
  Bookmark16,
  TrashCan16,
} from '@carbon/icons-react';

import {
  toggleBookmark,
  removeQuery,
  updateSpace,
} from '../../state/ducks/spaces/actions';

const Bookmarks = (props) => {
  const { spaces } = props;
  const [tab, setTab] = useState('history');
  return (
    <div
      className="bg-gray-fb overflow-y-scroll flex-1"
      style={{ height: '550px' }}>
      <ul className="flex space-x-5 text-secondary-250 p-4">
        <li
          className={`cursor-pointer ${tab === 'bookmarks' && ' text-primary'}`}
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
          ?.filter((_query) => (tab === 'bookmarks' ? _query.bookmarked : true))
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
                  onClick={() => props.removeQuery(spaces.activeSpace, __query)}
                  className="h-5 w-5 text-red-500 fill-current"
                />
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default connect((state) => state, {
  toggleBookmark,
  removeQuery,
  updateSpace,
})(Bookmarks);
