export const Types = {
  GET_COMMENTS_REQUEST: "comments/get_comments_request",
  GET_COMMENTS_SUCCESS: "comments/get_comments_success",
  GET_REPLIES_REQUEST: "comments/get_replies_request",
  GET_REPLIES_SUCCESS: "comments/get_replies_success",
  HANDLE_SORTING: "comments/handle_sorting",
  HANDLE_ERROR: "comments/handle_error",
};

export const getCommentsRequest = ({ objectId }) => ({
  type: Types.GET_COMMENTS_REQUEST,
  payload: {
    objectId,
  },
});

export const getCommentsSuccess = ({ items, objectId }) => ({
  type: Types.GET_COMMENTS_SUCCESS,
  payload: {
    items,
    objectId,
  },
});

export const getRepliesRequest = ({ objectId, commentId }) => ({
  type: Types.GET_REPLIES_REQUEST,
  payload: {
    commentId,
    objectId,
  },
});
export const getRepliesSuccess = ({ replies }) => ({
  type: Types.GET_REPLIES_SUCCESS,
  payload: {
    replies,
  },
});

export const handleSorting = (sort) => ({
  type: Types.HANDLE_SORTING,
  payload: { sort },
});
export const handleError = ({ error }) => ({
  type: Types.HANDLE_ERROR,
  payload: {
    error,
  },
});
