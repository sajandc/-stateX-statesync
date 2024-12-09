import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import login from "../reducer/login.reducer";
import rootSaga from "../saga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    login,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

// Run the saga
sagaMiddleware.run(rootSaga);

export default store;
