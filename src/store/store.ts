import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";

import creator from "./creator/creator";
import websiteSetting from './website-setting/setting'

const reducers = combineReducers({ 
  creator,
  websiteSetting
})

const store = configureStore({ reducer: reducers })

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export default store