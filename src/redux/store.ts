import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/dist/query"
import favoriteSlice from "./features/favoriteSlice"
import countriesApiReducer, { countriesApi } from "./services/countriesApi"
import weatherApiReducer, { weatherApi } from "./services/weatherApi"

export const store = configureStore({
  reducer: {
    favorites: favoriteSlice,
    [countriesApi.reducerPath]: countriesApiReducer,
    [weatherApi.reducerPath]: weatherApiReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      countriesApi.middleware,
      weatherApi.middleware,
    ),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
