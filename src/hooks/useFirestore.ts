import { UserCredential } from "firebase/auth"
import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { useState } from "react"
import { db } from "../auth/firebase"

type FormState = {
  [key: string]: string
}

export default function useFirestore() {
  const [error, setError] = useState("")

  const addUserToDatabase = async (
    user: UserCredential | void,
    userData: FormState,
  ) => {
    try {
      await addDoc(collection(db, "users"), {
        uid: user?.user.uid,
        ...userData,
        created: serverTimestamp(),
        authProvider: "local",
      })
      console.log("User added to Database")
    } catch (err: any) {
      console.log("Error adding user to Database")
      setError(err.message)
    }
  }
  return { addUserToDatabase, databaseError: error }
}
