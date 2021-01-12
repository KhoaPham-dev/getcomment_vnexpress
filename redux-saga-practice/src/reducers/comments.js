import { Types } from "../actions/comments";

const INITIAL_STATE = {
  items: {},
  sort: "like",
  objectId: 4219024,
};

const comments = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Types.GET_COMMENTS_SUCCESS: {
      return {
        items: action.payload.items,
        objectId: action.payload.objectId,
        sort: state.sort,
      };
    }
    case Types.GET_REPLIES_SUCCESS: {
      let index = state.items.items.findIndex((e) => {
        return (
          Number(e.comment_id) === Number(action.payload.replies[0].parent_id)
        );
      });
      if (index !== -1)
        state.items.items[index].replys.items = action.payload.replies;
      return { ...state };
    }
    case Types.HANDLE_SORTING: {
      return {
        items: state.items,
        objectId: state.objectId,
        sort: action.payload.sort,
      };
    }
    default: {
      return state;
    }
  }
};

export default comments;
