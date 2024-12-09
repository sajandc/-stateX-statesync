import { all, fork } from "redux-saga/effects";
import { loginSaga } from "./login.saga";

export default function* rootSaga() {
  yield all([
    fork(loginSaga), // Fork each saga
  ]);
}
