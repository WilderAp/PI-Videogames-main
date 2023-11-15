import {createStore, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"
import rootReducer from "../Reducer/Reducer"

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENTION_COMPOSE || compose;

export const store = createStore(
    rootReducer,
    composeEnhancer(applyMiddleware(thunk))
)