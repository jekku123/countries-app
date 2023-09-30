/* eslint-disable react-hooks/exhaustive-deps */
import { updateProfile } from "firebase/auth"
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth"
import * as yup from "yup"
import { auth } from "../firebase"
import AuthForm from "./AuthForm"

const initialValues = {
  name: "",
  email: "",
  password: "",
}

type FormState = typeof initialValues

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

  const onSubmit = async (values: FormState) => {
    const { name, email, password } = values
    const userData = await createUserWithEmailAndPassword(email, password)

    if (!userData) return
    await updateProfile(userData.user, {
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
