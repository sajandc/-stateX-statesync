import { takeEvery, call, put } from "redux-saga/effects";
import {
  FETCH_USERS_REQUEST,
  fetchUsersSuccess,
  fetchUsersFailure,
} from "../action/home.action";
import { callApi } from "../constant/callApi";
import { URL } from "../constant/urls";

function* fetchUsersSaga() {
  try {
    const users = yield call(callApi, URL.USERS_LIST, "get");
    yield put(fetchUsersSuccess(users));
  } catch (error) {
    yield put(fetchUsersFailure(error.message));
  }
}

export default function* Home() {
  yield takeEvery(FETCH_USERS_REQUEST, fetchUsersSaga);
}
