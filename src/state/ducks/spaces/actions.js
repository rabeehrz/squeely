import spaces from './types';

export const addSpace = () => (dispatch) =>
  dispatch({ type: spaces.ADD_SPACE });

export const setActiveSpace = (id) => (dispatch) =>
  dispatch({ type: spaces.SWITCH_ACTIVE_SPACE, payload: { id } });
