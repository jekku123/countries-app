import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/dist/query"
import countriesApiReducer, { countriesApi } from "../services/countriesApi"
import weatherApiReducer, { weatherApi } from "../services/weatherApi"

import firestoreApiReducer, { firestoreApi } from "../services/firestoreApi"

export const store = configureStore({
  reducer: {
    [countriesApi.reducerPath]: countriesApiReducer,
    [firestoreApi.reducerPath]: firestoreApiReducer,
    [weatherApi.reducerPath]: weatherApiReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      countriesApi.middleware,
      firestoreApi.middleware,
      weatherApi.middleware,
    ),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
