import { User } from "firebase/auth"
import { useEffect } from "react"
import { getFavorites, setFavorites } from "../features/favoriteSlice"

import { useAppDispatch, useAppSelector } from "../redux/hooks"

export default function useFavorites(user: User | null | undefined) {
  const { favorites, loading, error } = useAppSelector(
    (state) => state.favorites,
  )
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!user) return
    dispatch(getFavorites(user.uid))
  }, [dispatch, user])

  const handleFavoritesByName =
    (countryname: string) =>
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.stopPropagation()
      dispatch(setFavorites(countryname))
    }

  return { favorites, loading, error, handleFavoritesByName }
}
