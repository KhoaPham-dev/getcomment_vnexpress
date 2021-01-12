import { all } from "redux-saga/effects";

import commentsSaga from "./comments";

export default function* rootSaga() {
  yield all([...commentsSaga]);
}
