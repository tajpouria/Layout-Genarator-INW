import { all } from "redux-saga/effects";
import generatorWatcher from "./generator";

export default function* rootSaga() {
    yield all([generatorWatcher()]);
}
