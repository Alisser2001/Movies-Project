import { createStore, applyMiddleware } from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
//import rootReducer from "../reducer";
import { persistedReducer } from "./persistConfig";

export const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)));
//export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));