import spaces from './types';

export const addSpace = () => (dispatch) =>
  dispatch({ type: spaces.ADD_SPACE });

export const setActiveSpace = (id) => (dispatch) =>
  dispatch({ type: spaces.SWITCH_ACTIVE_SPACE, payload: { id } });

export const updateSpace = (space) => (dispatch) =>
  dispatch({ type: spaces.UPDATE_SPACE, payload: space });

export const deleteSpace = () => (dispatch) =>
  dispatch({ type: spaces.DELETE_SPACE });

export const executeQuery = (space) => (dispatch, getState) => {
  dispatch({ type: spaces.ADD_QUERY_TO_HISTORY, payload: space });
  const newRows = [...space.qData.rows];
  const newColumns = [...space.qData.columns];

  newRows
    .sort(() => 0.5 - Math.random())
    .slice(0, Math.floor(Math.random() * space.qData.rows.length));

  newColumns
    .sort(() => 0.5 - Math.random())
    .slice(0, Math.floor(Math.random() * space.qData.columns.length));

  const newSpace = getState().spaces.activeSpace;

  dispatch({
    type: spaces.UPDATE_SPACE,
    payload: {
      ...newSpace,
      qData: { columns: newColumns, rows: newRows },
    },
  });
};

export const removeQuery = (space, query) => (dispatch) => {
  dispatch({
    type: spaces.UPDATE_SPACE,
    payload: {
      ...space,
      queries: space.queries.filter((_query) => _query.id !== query.id),
    },
  });
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

  const data = { columns: cleanedColumns, rows: cleanedRows };

  dispatch({
    type: spaces.UPDATE_SPACE,
    payload: { ...space, data, qData: data },
  });
};

export const addDataWithoutFilter = (space, columns, rows) => (dispatch) => {
  const cleanedColumns = columns.map((column) => ({
    Header: column,
    accessor: column,
  }));

  const data = { columns: cleanedColumns, rows };
  dispatch({
    type: spaces.UPDATE_SPACE,
    payload: { ...space, data, qData: data },
  });
};
