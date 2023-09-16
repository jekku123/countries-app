import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const API_KEY = "362a234b661bbc98b5033161c7a33b15"

export const weatherApi = createApi({
  reducerPath: "weatherApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.openweathermap.org/data/2.5/",
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
