import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const BASE_URL = import.meta.env.VITE_OPENWEATHER_URL
const API_KEY = import.meta.env.VITE_OPENWEATHER_KEY

export const weatherApi = createApi({
  reducerPath: "weatherApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    getWeather: builder.query({
      query: (capital) => {
        return `weather?q=${capital}&units=metric&appid=${API_KEY}`
      },
    }),
  }),
})

export const { useGetWeatherQuery } = weatherApi
export default weatherApi.reducer
