import { takeEvery, fork, call, put, takeLatest } from "redux-saga/effects";

import * as actions from "../actions/comments";
import * as api from "../api/comments";

function* getComments(action) {
  try {
    let result = yield call(api.getComments, {
      objectId: action.payload.objectId,
    });
    yield put(
      actions.getCommentsSuccess({
        objectId: action.payload.objectId,
        items: result.data.data,
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
    });
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

const commentsSaga = [
  fork(watchGetCommentsRequest),
  fork(watchGetRepliesRequest),
];

export default commentsSaga;
