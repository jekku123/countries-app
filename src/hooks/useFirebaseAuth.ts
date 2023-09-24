import {
  useAuthState,
  useCreateUserWithEmailAndPassword,
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
  useSignOut,
  useUpdateProfile,
} from "react-firebase-hooks/auth"
import { auth } from "../auth/firebase"

export default function useFirebaseAuth() {
  const [user, loading, error] = useAuthState(auth)
  const [updateProfile, updating, updateError] = useUpdateProfile(auth)
  const [signUp, newUser, signUpLoading, signUpError] =
    useCreateUserWithEmailAndPassword(auth)
  const [signInWithEmailAndPassword, signedInUser, signInLoading, signInError] =
    useSignInWithEmailAndPassword(auth)
  const [signInWithGoogle, googleUser, googleLoading, googleError] =
    useSignInWithGoogle(auth)
  const [signOut] = useSignOut(auth)

  const createUserWithNameEmailAndPassword = async (
    username: string,
    email: string,
    password: string,
  ) => {
    const newUser = await signUp(email, password)
    if (!newUser) return null

    const updated = await updateProfile({
      displayName: username,
    })
    if (!updated) return null

    return newUser
  }

  return {
    user,
    loading,
    error,
    updateProfile,
    updating,
    updateError,
    signUp,
    newUser,
    signUpLoading,
    signUpError,
    signInWithEmailAndPassword,
    signedInUser,
    signInLoading,
    signInError,
    signInWithGoogle,
    googleUser,
    googleLoading,
    googleError,
    signOut,
    createUserWithNameEmailAndPassword,
  }
}
