import { all, fork } from "redux-saga/effects";
import Login from "./login.saga";

export default function* rootSaga() {
  yield all([
    fork(Login), // Fork each saga
  ]);
}
