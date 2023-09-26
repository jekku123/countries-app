import { useFormik } from "formik"
import { useEffect } from "react"
import {
  useAuthState,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth"
import { useNavigate } from "react-router-dom"
import { auth } from "../../auth/firebase"
import Form from "./AuthForm"

const initState = {
  email: "",
  password: "",
}

type FormState = typeof initState

export default function Login() {
  const formik = useFormik({
    initialValues: initState,
    onSubmit: handleLogin,
  })

  const [user, loading] = useAuthState(auth)

  const [signInWithEmailAndPassword, , signInLoading, signInError] =
    useSignInWithEmailAndPassword(auth)

  const navigate = useNavigate()

  useEffect(() => {
    if (loading) return
    if (user) navigate("/countries")
  }, [user, loading])

  async function handleLogin(values: FormState) {
    const { email, password } = values
    if (!email || !password) return
    await signInWithEmailAndPassword(email, password)
  }

  return (
    <Form
      {...{
        formik,
        signInLoading,
        signInError,
      }}
    />
  )
}
