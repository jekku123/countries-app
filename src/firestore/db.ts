import { User, updateProfile } from "firebase/auth"
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
} from "firebase/firestore"
import { app } from "../firebase-config"

export const db = getFirestore(app)

export const addUserToDatabase = async (
  user: User,
  name: string,
  email: string,
) => {
  const docRef = doc(db, "users", user.uid)
  try {
    await setDoc(docRef, {
      uid: user.uid,
      name,
      email,
      authProvider: "local",
    })
    await updateProfile(user, {
      displayName: name,
    })
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export const removeFavoriteFromDatabase = (uid: string, favoriteId: string) => {
  try {
    const docRef = doc(db, `users/${uid}/favorites`, favoriteId)
    deleteDoc(docRef)
  } catch (err: any) {
    throw new Error(err.message)
  }
}

export const removeAllFavoritesFromDatabase = async (uid: string) => {
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

export const addFavoriteToDatabase = (
  uid: string,
  countryName: string,
  favId: string,
) => {
  const docRef = doc(db, `users/${uid}/favorites`, favId)
  try {
    setDoc(docRef, {
      countryName,
    })
  } catch (err: any) {
    throw new Error(err.message)
  }
}

export const getFavoritesFromDatabase = async (uid: string) => {
  const docRef = collection(db, `users/${uid}/favorites`)
  const querySnapshot = await getDocs(query(docRef))
  const favorites = querySnapshot.docs.map((doc) => {
    return { id: doc.id, countryName: doc.data().countryName }
  })
  return favorites
}
