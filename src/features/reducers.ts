import { v4 as uuid } from "uuid"
import { auth } from "../firebase-config"
import {
  addFavoriteToDatabase,
  removeAllFavoritesFromDatabase,
  removeFavoriteFromDatabase,
} from "../firestore/db"
import { FavoritesState } from "./favoriteSlice"

export const setFavoritesReducer = (
  state: FavoritesState,
  action: { payload: string },
) => {
  const user = auth.currentUser

  if (!user) return

  const userId = user.uid
  const countryName = action.payload
  const indexOfFavorite = state.favorites.findIndex(
    (favorite) => favorite.countryName === countryName,
  )

  if (indexOfFavorite !== -1) {
    const oldFavoriteId = state.favorites[indexOfFavorite]?.id
    state.favorites.splice(indexOfFavorite, 1)
    removeFavoriteFromDatabase(userId, oldFavoriteId)
  } else {
    const newFavoriteId = uuid()
    state.favorites.push({ id: newFavoriteId, countryName })
    addFavoriteToDatabase(userId, countryName, newFavoriteId)
  }
}

export const clearFavoritesReducer = (state: FavoritesState) => {
  const user = auth.currentUser
  if (!user) return
  state.favorites = []
  removeAllFavoritesFromDatabase(user.uid)
}
