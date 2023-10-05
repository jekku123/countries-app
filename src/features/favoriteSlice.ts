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
  error: string | null
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
    error: null,
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
        state.error = null
      })
      .addCase(getFavorites.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "There was an error"
      })
  },
})

export const { setFavorites, clearFavorites } = favoritesSlice.actions
export default favoritesSlice.reducer
