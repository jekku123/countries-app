/* eslint-disable react-hooks/exhaustive-deps */
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "../../auth/firebase"
import { Outlet, useNavigate } from "react-router-dom"
import { useEffect } from "react"

export const AuthRoute = () => {
  const [user, loading] = useAuthState(auth)

  const navigate = useNavigate()

  useEffect(() => {
    if (loading) return
    if (user) navigate("/countries")
  }, [user, loading])

  return <Outlet />
}
