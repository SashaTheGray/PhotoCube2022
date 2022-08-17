/*
 * This module contains the Redux store.
 */

// Imports.
import {
  configureStore,
  combineReducers,
  bindActionCreators,
} from "@reduxjs/toolkit"
import Thunk from "redux-thunk"
import Logger from "./middleware/logger"
import { filterReducer, filterActions} from "./features/filter"

// Configure the Redux store.
export const photoCubeStore = configureStore({
  // Register reducers with the store.
  reducer: combineReducers({
    filters: filterReducer,
  }),

  // Register middleware with the store.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(Thunk).concat(Logger),
})

// Export available actions with the dispatcher.
export const dispatchAction = bindActionCreators(
  {
      ...filterActions
  },
  photoCubeStore.dispatch
)

// Infer the type of photoCubeStore.getState() and .dispatch().
export type RootState = ReturnType<typeof photoCubeStore.getState>
export type AppDispath = typeof photoCubeStore.dispatch
