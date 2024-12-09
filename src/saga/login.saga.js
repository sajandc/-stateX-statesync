import { takeLatest, put, call } from "redux-saga/effects";
import * as loginAction from "../action/login.action";

export function* onLogin(action) {
  try {
  } catch (error) {}
}

export function* Login() {
  yield takeLatest("ON_LOGIN", onLogin);
}
