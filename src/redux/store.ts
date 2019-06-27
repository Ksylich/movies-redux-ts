import { applyMiddleware, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga";

import movies from "../sagas";
import reducer from "./reducers";

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export type MState = ReturnType<typeof reducer>;

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(movies);

export default store;
