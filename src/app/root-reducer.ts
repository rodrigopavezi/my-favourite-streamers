import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "features/auth/slice";
import homeReducer from "features/home/slice";

import { connectRouter } from "connected-react-router";

const createRootReducer = (history: any) =>
  combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    home: homeReducer,
  });

export default createRootReducer;
