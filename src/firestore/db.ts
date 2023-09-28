import { User } from "firebase/auth"
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore"
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
