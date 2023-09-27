import { useAuthState } from "react-firebase-hooks/auth"
import { Navigate, Outlet } from "react-router-dom"
import { auth } from "../auth/firebase"

export const ProtectedRoute = () => {
  const [user] = useAuthState(auth)
  return user ? <Outlet /> : <Navigate to="/login" />
}
