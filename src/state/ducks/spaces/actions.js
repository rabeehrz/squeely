import spaces from './types';

export const addSpace = () => (dispatch) =>
  dispatch({ type: spaces.ADD_SPACE });

export const setActiveSpace = (id) => (dispatch) =>
  dispatch({ type: spaces.SWITCH_ACTIVE_SPACE, payload: { id } });

export const updateSpace = (space) => (dispatch) =>
  dispatch({ type: spaces.UPDATE_SPACE, payload: space });

export const executeQuery = (space) => (dispatch) => {
  dispatch({ type: spaces.ADD_QUERY_TO_HISTORY, payload: space });
  // Execute query
};

export const toggleBookmark = (space, query) => (dispatch) => {
  const newQueries = space.queries.map((_query) =>
    query.id === _query.id
      ? { ..._query, bookmarked: !_query.bookmarked }
      : _query,
  );
  dispatch({
    type: spaces.UPDATE_SPACE,
    payload: { ...space, queries: newQueries },
  });
};

export const addData = (space, columns, rows) => (dispatch) => {
  const cleanedColumns = columns.map((column) => ({
    Header: column,
    accessor: column,
  }));
  const cleanedRows = [];
  rows.forEach((row) => {
    const obj = {};
    row.forEach((item, index) => {
      obj[columns[index]] = item;
    });
    cleanedRows.push(obj);
  });

  dispatch({
    type: spaces.UPDATE_SPACE,
    payload: { ...space, data: { columns: cleanedColumns, rows: cleanedRows } },
  });
};

export const addDataWithoutFilter = (space, columns, rows) => (dispatch) => {
  const cleanedColumns = columns.map((column) => ({
    Header: column,
    accessor: column,
  }));

  dispatch({
    type: spaces.UPDATE_SPACE,
    payload: { ...space, data: { columns: cleanedColumns, rows } },
  });
};
