import { User } from "firebase/auth"
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore"
import { db } from "../firebase"

type FormState = {
  [key: string]: string
}

export const setUserToDatabase = async (user: User, userData: FormState) => {
  if (!user) return
  try {
    await setDoc(doc(db, "users", user.uid), {
      ...userData,
      created: serverTimestamp(),
      authProvider: "local",
    })
  } catch (err: any) {
    throw new Error(err.message)
  }
}

export const getUserFromDatabase = async (user: User) => {
  if (!user) return
  try {
    const docSnap = await getDoc(doc(db, "users", user.uid))
    if (docSnap.exists()) {
      const userData = docSnap.data()
      return userData
    } else {
      return null
    }
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export const getUserFavorites = async (user: User): Promise<[]> => {
  if (!user) return []
  const q = query(collection(db, "favorites"), where("userId", "==", user.uid))
  const querySnapshot = await getDocs(q)
  const favorites: any = []
  querySnapshot.forEach((doc) => {
    favorites.push({ uid: doc.id, data: doc.data() })
  })
  return favorites
}

export const updateUserFavorites = async (user: User, countryName: string) => {
  if (!user) return
  const favorites: any = await getUserFavorites(user)
  if (
    favorites.some((favorite: any) => favorite.data.countryName === countryName)
  ) {
    const index = favorites.findIndex(
      (favorite: any) => favorite.data.countryName === countryName,
    )
    try {
      await deleteDoc(doc(db, "favorites", favorites[index].uid))
    } catch (err: any) {
      throw new Error(err.message)
    }
  } else {
    try {
      await addDoc(collection(db, "favorites"), {
        userId: user.uid,
        countryName,
        authProvider: "local",
      })
    } catch (err: any) {
      throw new Error(err.message)
    }
  }
}
