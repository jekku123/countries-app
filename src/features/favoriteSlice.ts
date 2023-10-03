import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
} from "firebase/firestore"
import { v4 as uuid } from "uuid"
import { app, auth } from "../firebase-config"

export const db = getFirestore(app)

export type FavoriteType = {
  id: string
  countryName: string
}

type FavoritesState = {
  favorites: FavoriteType[]
  loading: boolean
}

const removeFavoriteFromDatabase = (uid: string, favoriteId: string) => {
  try {
    const docRef = doc(db, `users/${uid}/favorites`, favoriteId)
    deleteDoc(docRef)
  } catch (err: any) {
    throw new Error(err.message)
  }
}

const removeAllFavoritesFromDatabase = async (uid: string) => {
  try {
    const q = query(collection(db, `users/${uid}/favorites`))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      deleteDoc(doc.ref)
    })
  } catch (err: any) {
    throw new Error(err.message)
  }
}

const addFavoriteToDatabase = (
  uid: string,
  countryName: string,
  favId: string,
) => {
  try {
    setDoc(doc(db, `users/${uid}/favorites`, favId), {
      countryName,
    })
  } catch (err: any) {
    throw new Error(err.message)
  }
}

export const getFavorites = createAsyncThunk<FavoriteType[], string | null>(
  "favorites/getFavorites",
  async (uid: string | null) => {
    if (!uid) return []
    const q = query(collection(db, `users/${uid}/favorites`))
    const querySnapshot = await getDocs(q)
    const favorites = querySnapshot.docs.map((doc) => {
      return { id: doc.id, countryName: doc.data().countryName }
    })
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
    setFavorites: (state, action) => {
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
    },

    clearFavorites: (state) => {
      const user = auth.currentUser
      if (!user) return
      state.favorites = []
      removeAllFavoritesFromDatabase(user.uid)
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getFavorites.fulfilled, (state, action) => {
        state.favorites = action.payload
        state.loading = false
      })
      .addCase(getFavorites.rejected, (state) => {
        state.loading = false
      })
  },
})

export const { setFavorites, clearFavorites } = favoritesSlice.actions

export default favoritesSlice.reducer
