import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const BASE_URL = "https://restcountries.com/v3.1"

export interface ICountry {
  name: {
    common: string
  }
  flags: {
    svg: string
    png: string
  }
  population: number
  capital: string[]
  currencies: {
    [key: string]: {
      name: string
      symbol: string
    }
  }
  maps: {
    googleMaps: string
  }
}

export const countriesApi = createApi({
  reducerPath: "countriesApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getCountries: builder.query<ICountry[], void>({
      query: () => "all?fields=name,flags,population,capital,currencies",
      transformResponse: (response: ICountry[]) => {
        const sortedCountries = response.sort((a, b) =>
          a.name.common.localeCompare(b.name.common, "fi"),
        )
        return sortedCountries
      },
    }),
  }),
})

export const { useGetCountriesQuery } = countriesApi
export default countriesApi.reducer
