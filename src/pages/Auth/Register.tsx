import { updateProfile } from "firebase/auth"
import { useFormik } from "formik"
import { useEffect } from "react"
import {
  useAuthState,
  useCreateUserWithEmailAndPassword,
} from "react-firebase-hooks/auth"
import { useNavigate } from "react-router-dom"
import * as yup from "yup"
import { auth } from "../../auth/firebase"
import { setUserToDatabase } from "../../firestore/db"
import Form from "./AuthForm"

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
  const formik = useFormik({
    initialValues: initState,
    validationSchema: validationSchema,
    onSubmit: handleRegistration,
  })
  const [user, loading] = useAuthState(auth)

  const [createUserWithEmailAndPassword, , signUpLoading, signUpError] =
    useCreateUserWithEmailAndPassword(auth)

  const navigate = useNavigate()

  useEffect(() => {
    if (loading) return
    if (user) navigate("/countries")
  }, [user, loading])

  async function handleRegistration(values: FormState) {
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
    <Form
      {...{
        formik,
        signUpLoading,
        signUpError,
      }}
    />
  )
}
