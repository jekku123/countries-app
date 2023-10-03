import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore"
import { app, auth } from "../firebase-config"

export const db = getFirestore(app)

type FavoritesState = {
  favorites: string[]
  loading: boolean
}

const removeFavoriteFromDatabase = async (uid: string, countryName: string) => {
  try {
    // const docRef = doc(db, `users/${uid}/favorites`, countryName)
    // deleteDoc(docRef)
    const q = query(
      collection(db, `users/${uid}/favorites`),
      where("countryName", "==", countryName),
    )
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      deleteDoc(doc.ref)
    })
  } catch (err: any) {
    throw new Error(err.message)
  }
}

const addFavoriteToDatabase = async (uid: string, countryName: string) => {
  try {
    await addDoc(collection(db, `users/${uid}/favorites`), {
      countryName,
    })
  } catch (err: any) {
    throw new Error(err.message)
  }
}

export const getFavorites = createAsyncThunk<string[], string | null>(
  "favorites/getFavorites",
  async (uid: string | null) => {
    if (!uid) return []
    const q = query(collection(db, `users/${uid}/favorites`))
    const querySnapshot = await getDocs(q)
    const favorites = querySnapshot.docs.map((doc) => doc.data().countryName)
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
      const countryName = action.payload
      const favoriteIndex = state.favorites.indexOf(countryName)
      if (favoriteIndex !== -1) {
        state.favorites.splice(favoriteIndex, 1)
        if (user) removeFavoriteFromDatabase(user.uid, countryName)
      } else {
        state.favorites.push(countryName)
        if (user) addFavoriteToDatabase(user.uid, countryName)
      }
    },

    clearFavorites: (state) => {
      state.favorites = []
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
