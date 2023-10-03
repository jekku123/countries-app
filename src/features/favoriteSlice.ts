import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getFavoritesFromDatabase } from "../firestore/db"
import { clearFavoritesReducer, setFavoritesReducer } from "./reducers"

export type FavoriteType = {
  id: string
  countryName: string
}

export type FavoritesState = {
  favorites: FavoriteType[]
  loading: boolean
}

export const getFavorites = createAsyncThunk<FavoriteType[], string | null>(
  "favorites/getFavorites",
  async (uid: string | null) => {
    if (!uid) return []
    const favorites = await getFavoritesFromDatabase(uid)
    return favorites
  },
)

export const favoritesSlice = createSlice({
  name: "favorites",

  initialState: {
    favorites: [],
    loading: true,
  } as FavoritesState,

  reducers: {
    setFavorites: setFavoritesReducer,
    clearFavorites: clearFavoritesReducer,
  },

  extraReducers: (builder) => {
    builder
      .addCase(getFavorites.fulfilled, (state, action) => {
        state.favorites = action.payload
        state.loading = false
      })
      .addCase(getFavorites.pending, (state) => {
        state.loading = true
      })
      .addCase(getFavorites.rejected, (state) => {
        state.loading = false
      })
  },
})

export const { setFavorites, clearFavorites } = favoritesSlice.actions

export default favoritesSlice.reducer
