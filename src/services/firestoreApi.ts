import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react"
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore"
import { db } from "../firebase"

type FavoriteDataType = {
  userId: string
  countryName: string
  authProvider: string
}

export type FavoriteType = {
  uid: string
  userId: string
  countryName: string
  authProvider: string
}

export const firestoreApi = createApi({
  reducerPath: "firestoreApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Favorites"],
  endpoints: (builder) => ({
    getFavorites: builder.query<FavoriteType[], string | undefined>({
      queryFn: async (userId) => {
        if (!userId) return { data: [] }
        try {
          const q = query(
            collection(db, "favorites"),
            where("userId", "==", userId),
          )
          const querySnapshot = await getDocs(q)
          const favorites: FavoriteType[] = []
          querySnapshot.forEach((doc) => {
            const favoriteData = doc.data() as FavoriteDataType
            favorites.push({ uid: doc.id, ...favoriteData })
          })
          return { data: favorites }
        } catch (err: any) {
          return { error: err.message }
        }
      },
      providesTags: ["Favorites"],
    }),

    setFavorite: builder.mutation({
      queryFn: async ({ userId, countryName, favorites }) => {
        if (!userId || !countryName) return { data: null }
        const fav = favorites.find(
          (el: FavoriteType) => el.countryName === countryName,
        )
        if (!fav?.uid) {
          try {
            addDoc(collection(db, "favorites"), {
              userId,
              countryName,
              authProvider: "local",
            })
            return { data: null }
          } catch (err: any) {
            return { error: err.message }
          }
        } else {
          try {
            deleteDoc(doc(db, "favorites", fav.uid))
            return { data: null }
          } catch (err: any) {
            return { error: err.message }
          }
        }
      },
      invalidatesTags: ["Favorites"],
    }),
  }),
})

export default firestoreApi.reducer
export const { useGetFavoritesQuery, useSetFavoriteMutation } = firestoreApi
