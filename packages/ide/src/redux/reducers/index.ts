import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { generatorReducer } from "./generator";
import { History } from "history";

export default (history: History<any>) =>
    combineReducers({
        router: connectRouter(history),
        generator: generatorReducer
    });
