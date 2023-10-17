import { User } from "firebase/auth"
import { useEffect } from "react"
import {
  clearFavorites,
  getFavorites,
  setFavorites,
} from "../redux/features/favoriteSlice"

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

  const handleFavoriteClick =
    (countryname: string) =>
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.stopPropagation()
      dispatch(setFavorites(countryname))
    }

  const removeFavorites = () => {
    dispatch(clearFavorites())
  }

  return { favorites, loading, error, handleFavoriteClick, removeFavorites }
}
