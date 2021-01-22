import { takeEvery, fork, call, put, takeLatest } from "redux-saga/effects";

import * as actions from "../actions/comments";
import * as api from "../api/comments";

function* getComments(action) {
  try {
    let result = yield call(api.getComments, {
      objectId: action.payload.objectId,
      offset: action.payload.offset,
      sort: action.payload.sort,
    });
    let userProfiles = yield call(api.getUserProfiles, result.data.data.items);
    yield put(
      actions.getCommentsSuccess({
        objectId: action.payload.objectId,
        offset: action.payload.offset,
        items: result.data.data,
        userItems: userProfiles.data.arrUsers,
      })
    );
  } catch (error) {
    yield put(actions.handleError({ error: error.message }));
  }
}

function* watchGetCommentsRequest() {
  yield takeEvery(actions.Types.GET_COMMENTS_REQUEST, getComments);
}

function* getReplies(action) {
  try {
    let result = yield call(api.getReplies, {
      objectId: action.payload.objectId,
      commentId: action.payload.commentId,
      limit: action.payload.limit || 3,
      sort: action.payload.sort,
    });
    //let userProfiles = yield call(api.getUserProfiles, result.data.data.items);
    yield put(
      actions.getRepliesSuccess({
        replies: result.data.data.items,
      })
    );
  } catch (error) {
    yield put(actions.handleError({ error: error.message }));
  }
}
function* watchGetRepliesRequest() {
  yield takeEvery(actions.Types.GET_REPLIES_REQUEST, getReplies);
}
function* watchHandleSorting() {
  yield takeEvery(actions.Types.HANDLE_SORTING, getComments);
}
const commentsSaga = [
  fork(watchGetCommentsRequest),
  fork(watchGetRepliesRequest),
  fork(watchHandleSorting),
];

export default commentsSaga;
