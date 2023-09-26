/* eslint-disable react-hooks/exhaustive-deps */
import { updateProfile } from "firebase/auth"
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth"
import * as yup from "yup"
import { auth } from "../../auth/firebase"
import { setUserToDatabase } from "../../firestore/db"
import AuthForm from "./AuthForm"

const initState = {
  name: "",
  email: "",
  password: "",
}

type FormState = typeof initState

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
  const [createUserWithEmailAndPassword, , signUpLoading, signUpError] =
    useCreateUserWithEmailAndPassword(auth)

  const handleRegistration = async (values: FormState) => {
    const { name, email, password } = values
    const userData = await createUserWithEmailAndPassword(email, password)
    if (!userData) return
    await updateProfile(userData.user, {
      displayName: name,
    })
    setUserToDatabase(userData.user, {
      name,
      email,
    })
  }

  return (
    <AuthForm
      {...{
        initState,
        onSubmit: handleRegistration,
        validationSchema,
        loading: signUpLoading,
        error: signUpError,
      }}
    />
  )
}
