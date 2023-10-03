/* eslint-disable react-hooks/exhaustive-deps */
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth"
import { auth } from "../firebase-config"
import AuthForm from "./AuthForm"

const initialValues = {
  email: "",
  password: "",
}

export default function Login() {
  const [signInWithEmailAndPassword, , loading, error] =
    useSignInWithEmailAndPassword(auth)

  const onSubmit = async (values: { [key: string]: string }) => {
    const { email, password } = values
    if (!email || !password) return
    await signInWithEmailAndPassword(email, password)
  }

  return (
    <AuthForm
      {...{
        initialValues,
        onSubmit,
        loading,
        error,
      }}
    />
  )
}
