import { useLocation } from "react-router-dom"
import { useGetWeatherQuery } from "../services/weatherApi"

export default function CountriesSingle() {
  const location = useLocation()
  const country = location.state.country

  const {
    data: weather,
    isLoading,
    error,
  } = useGetWeatherQuery(country.capital)

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Sorry, there was an error</div>

  console.log("data", weather)

  return <div>Single Country will be here</div>
}
