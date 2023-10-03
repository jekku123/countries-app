/* eslint-disable react-hooks/exhaustive-deps */
import { updateProfile } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth"
import * as yup from "yup"
import { auth } from "../firebase-config"

import { db } from "../features/favoriteSlice"

const initialValues = {
  name: "",
  email: "",
  password: "",
}

const validationSchema = yup.object({
  name: yup
    .string()
    .min(2, "Name should be atleast 2 characters long")
    .required("Name is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Atleast 6 characters long")
    .required("Password is required"),
})

export default function Register() {
  const [createUserWithEmailAndPassword, , loading, error] =
    useCreateUserWithEmailAndPassword(auth)

  const onSubmit = async (values: { [key: string]: string }) => {
    const { name, email, password } = values
    const res = await createUserWithEmailAndPassword(email, password)

    if (!res) return

    const user = res.user

    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    })

    await updateProfile(user, {
      displayName: name,
    })
  }

  return (
    <AuthForm
      {...{
        initialValues,
        onSubmit,
        validationSchema,
        loading,
        error,
      }}
    />
  )
}
