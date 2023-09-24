import { Navigate, Outlet, createBrowserRouter } from "react-router-dom"
import Layout from "../Layout"
import useFirebaseAuth from "../hooks/useFirebaseAuth"
import CountriesList from "../pages/CountriesList"
import CountriesSingle from "../pages/CountriesSingle"
import Home from "../pages/Home"
import Login from "../pages/Login"
import Register from "../pages/Register"

const ProtectedRoute = () => {
  const { user } = useFirebaseAuth()
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
