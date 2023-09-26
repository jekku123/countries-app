import { useAuthState } from "react-firebase-hooks/auth"
import { Navigate, Outlet, createBrowserRouter } from "react-router-dom"
import Layout from "../Layout"
import { auth } from "../auth/firebase"
import CountriesList from "../pages/CountriesList"
import CountriesSingle from "../pages/CountriesSingle"
import Home from "../pages/Home"

import Login from "../pages/Auth/Login"
import Register from "../pages/Auth/Register"

const ProtectedRoute = () => {
  const [user] = useAuthState(auth)
  return user ? <Outlet /> : <Navigate to="/login" />
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/countries",
            children: [
              { index: true, element: <CountriesList /> },
              { path: ":single", element: <CountriesSingle /> },
            ],
          },
        ],
      },
    ],
  },
])
