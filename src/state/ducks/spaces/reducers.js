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
        currentQuery: '',
        queries: [],
      };
      return {
        ...state,
        spaces: [...state.spaces, newSpace],
        activeSpace: newSpace,
      };

    case spaces.DELETE_SPACE:
      const newSpaces = state.spaces.filter(
        (space) => space.id !== state.activeSpace.id,
      );
      return {
        ...state,
        spaces: newSpaces,
        activeSpace: newSpaces[0] || {},
      };
    case spaces.SWITCH_ACTIVE_SPACE:
      return {
        ...state,
        activeSpace: state.spaces.find((space) => space.id === payload.id),
      };

    case spaces.UPDATE_SPACE:
      return {
        ...state,
        spaces: state.spaces.map((space) =>
          space.id === payload.id ? payload : space,
        ),
        activeSpace: payload,
      };

    case spaces.ADD_QUERY_TO_HISTORY:
      const cleanedPayload = {
        ...payload,
        queries: [
          { id: nanoid(), text: payload.currentQuery, bookmarked: false },
          ...payload.queries,
        ],
      };
      return {
        ...state,
        spaces: state.spaces.map((space) =>
          space.id === payload.id ? cleanedPayload : space,
        ),
        activeSpace: cleanedPayload,
      };

    default:
      return state;
  }
};
