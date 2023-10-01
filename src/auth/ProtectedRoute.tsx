import { useAuthState } from "react-firebase-hooks/auth"
import { Navigate, Outlet } from "react-router-dom"
import { auth } from "../firebase-config"

export const ProtectedRoute = () => {
  const [user, loading] = useAuthState(auth)
  return user ? <Outlet /> : loading ? <></> : <Navigate to="/login" />
}
