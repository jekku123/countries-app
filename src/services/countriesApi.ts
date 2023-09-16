import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export interface ICountry {
  name: {
    common: string
  }
  flags: {
    png: string
    svg: string
  }
  population: number
  capital: string[]
}

export const countriesApi = createApi({
  reducerPath: "countriesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://restcountries.com/v3.1/" }),
  endpoints: (builder) => ({
    getCountries: builder.query<ICountry[], void>({
      query: () => `all`,
      transformResponse: (response: ICountry[]) => {
        const sortedCountries = response.sort((a, b) =>
          a.name.common.localeCompare(b.name.common),
        )
        return sortedCountries
      },
    }),
  }),
})

export const { useGetCountriesQuery } = countriesApi
export default countriesApi.reducer
