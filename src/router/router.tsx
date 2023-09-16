import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom"
import Layout from "../Layout"
import Countries from "../pages/Countries"
import CountriesSingle from "../pages/CountriesSingle"
import Home from "../pages/Home"

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="/" element={<Home />} />
      <Route path="/countries" element={<Countries />} />
      <Route path="/countries/:single" element={<CountriesSingle />} />
    </Route>,
  ),
)
