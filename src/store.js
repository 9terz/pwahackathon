import {createStore, combineReducers, applyMiddleware} from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";

import math from "reducers/mathReducer";
import user from "reducers/userReducer";
import image from "reducers/imageReducer";

export default createStore(
    combineReducers({
        math,
        user,
        image
    }),
    {},
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());