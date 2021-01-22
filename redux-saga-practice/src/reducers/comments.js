import { Types } from "../actions/comments";

const INITIAL_STATE = {
  items: {},
  userItems: {},
  sort: "like",
  objectId: 4224611,
  isLoading: true,
  offset: 0,
  error: "",
};

const comments = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Types.GET_COMMENTS_REQUEST: {
      return {
        ...state,
        isLoading: action.payload.forWhat || true,
      };
    }
    case Types.GET_COMMENTS_SUCCESS: {
      return {
        ...state,
        items: action.payload.items,
        objectId: action.payload.objectId,
        sort: state.sort,
        isLoading: false,
        offset: action.payload.offset,
        userItems: action.payload.userItems,
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
        ...state,
        isLoading: false,
      };
    }
    case Types.HANDLE_SORTING: {
      return {
        ...state,
        sort: action.payload.sort,
        isLoading: true,
      };
    }
    case Types.GET_REPLIES_REQUEST: {
      return {
        ...state,
        isLoading: `reply_${action.payload.commentId}`,
      };
    }
    case Types.HANDLE_ERROR: {
      return {
        ...state,
        error: action.payload.error,
      };
    }
    case Types.HANDLE_LOAD_MORE: {
      return {
        ...state,
        isLoading: "loadmore",
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
