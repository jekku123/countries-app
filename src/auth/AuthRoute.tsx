/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { Outlet, useNavigate } from "react-router-dom"
import { auth } from "../firebase-config"

export const AuthRoute = () => {
  const [user, loading] = useAuthState(auth)

  const navigate = useNavigate()

  useEffect(() => {
    if (loading) return
    if (user) navigate("/countries")
  }, [user, loading])

  return <Outlet />
}
