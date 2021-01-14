import { Types } from "../actions/comments";

const INITIAL_STATE = {
  items: {},
  sort: "like",
  objectId: 4219024,
  isLoading: true,
  error: "",
};

const comments = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Types.GET_COMMENTS_SUCCESS: {
      return {
        items: action.payload.items,
        objectId: action.payload.objectId,
        sort: state.sort,
        isLoading: false,
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
      return {
        items: state.items,
        sort: state.sort,
        objectId: state.objectId,
        isLoading: false,
      };
    }
    case Types.HANDLE_SORTING: {
      return {
        items: state.items,
        objectId: state.objectId,
        sort: action.payload.sort,
        isLoading: false,
      };
    }
    case Types.GET_REPLIES_REQUEST: {
      return {
        items: state.items,
        objectId: state.objectId,
        sort: state.sort,
        isLoading: `reply_${action.payload.commentId}`,
      };
    }
    case Types.HANDLE_ERROR: {
      return {
        ...state,
        error: action.payload.error,
      };
    }
    default: {
      return {
        ...state,
        isLoading: true,
      };
    }
  }
};

export default comments;
