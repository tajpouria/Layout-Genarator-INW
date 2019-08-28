import { createStore, applyMiddleware } from "redux";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";
import createSagaMiddleware from "redux-saga";
import createRootReducer from "./reducers";
import rootSaga from "./sagas";

export const history = createBrowserHistory();

export const sagaMiddleware = createSagaMiddleware();

const rootReducer = createRootReducer(history);

export type CoreStore = ReturnType<typeof rootReducer>;

const middlewareStack = [
    routerMiddleware(history),
    sagaMiddleware,
];

export default (initialState?: object) => {
    const store = createStore(rootReducer, initialState, applyMiddleware(...middlewareStack));

    sagaMiddleware.run(rootSaga);

    if (module.hot) {
        module.hot.accept("./reducers", () => {
            store.replaceReducer(rootReducer);
        });
    }

    return store;
};