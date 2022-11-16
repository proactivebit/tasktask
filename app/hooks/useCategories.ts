import { useEffect } from "react"
import { useStores } from "../models"

export const useCategories = () => {
  const {
    categoryStore,
    authenticationStore: { user },
  } = useStores()

  useEffect(() => {
    categoryStore.loadCategoris(user.uid)
  }, [])
}
