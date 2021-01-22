export const Types = {
  GET_COMMENTS_REQUEST: "comments/get_comments_request",
  GET_COMMENTS_SUCCESS: "comments/get_comments_success",
  GET_REPLIES_REQUEST: "comments/get_replies_request",
  GET_REPLIES_SUCCESS: "comments/get_replies_success",
  HANDLE_SORTING: "comments/handle_sorting",
  HANDLE_ERROR: "comments/handle_error",
  HANDLE_LOAD_MORE: "comments/handle_loadmore",
};

export const getCommentsRequest = ({ objectId, offset, sort, forWhat }) => ({
  type: Types.GET_COMMENTS_REQUEST,
  payload: {
    objectId,
    offset,
    sort,
    forWhat,
  },
});

export const getCommentsSuccess = ({ items, objectId, offset, userItems }) => ({
  type: Types.GET_COMMENTS_SUCCESS,
  payload: {
    items,
    objectId,
    offset,
    userItems,
  },
});

export const getRepliesRequest = ({ objectId, commentId, sort, limit }) => ({
  type: Types.GET_REPLIES_REQUEST,
  payload: {
    commentId,
    objectId,
    limit,
    sort,
  },
});
export const getRepliesSuccess = ({ replies }) => ({
  type: Types.GET_REPLIES_SUCCESS,
  payload: {
    replies,
  },
});

export const handleSorting = ({ objectId, offset, sort }) => ({
  type: Types.HANDLE_SORTING,
  payload: { objectId, offset, sort },
});
export const handleError = ({ error }) => ({
  type: Types.HANDLE_ERROR,
  payload: {
    error,
  },
});
export const handleLoadMore = () => ({
  type: Types.HANDLE_LOAD_MORE,
});
