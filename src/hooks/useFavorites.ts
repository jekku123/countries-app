import { User } from "firebase/auth"
import { useEffect } from "react"
import { getFavorites, setFavorites } from "../features/favoriteSlice"
import { useAppDispatch, useAppSelector } from "../redux/hooks"

export default function useFavorites(user: User | null | undefined) {
  const favorites = useAppSelector((state) => state.favorites.favorites)
  const loading = useAppSelector((state) => state.favorites.loading)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!user) return
    dispatch(getFavorites(user.uid))
  }, [dispatch, user])

  const handleFavorites =
    (name: string) => (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.stopPropagation()
      if (!user) return
      dispatch(setFavorites(name))
    }

  return { favorites, loading, handleFavorites }
}