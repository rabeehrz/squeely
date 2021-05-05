import { nanoid } from 'nanoid';
import spaces from './types';

const initialState = {
  spaces: [],
  activeSpace: {},
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case spaces.ADD_SPACE:
      const newSpace = {
        id: nanoid(),
        name: 'Untitled',
        data: {},
        queries: {},
      };
      return {
        ...state,
        spaces: [...state.spaces, newSpace],
        activeSpace: newSpace,
      };
    case spaces.SWITCH_ACTIVE_SPACE:
      return {
        ...state,
        activeSpace: state.spaces.find((space) => space.id === payload.id),
      };

    default:
      return state;
  }
};
