import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react"
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore"
import { app } from "../firebase-config"

export type FavoriteType = {
  uid: string
  userId: string
  countryName: string
  authProvider: string
}

const db = getFirestore(app)

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
            favorites.push({ uid: doc.id, ...doc.data() } as FavoriteType)
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
            await addDoc(collection(db, "favorites"), {
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
            await deleteDoc(doc(db, "favorites", fav.uid))
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
