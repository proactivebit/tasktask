import { useMemo } from "react"
import { Category } from "../models/Category"
import { colors } from "../theme"

export const useCategoryColor = (category: Category | undefined) => {
  const selectedCategoryColor = useMemo(() => {
    return category ? category.color : colors.palette.neutral900
  }, [category])

  return { color: selectedCategoryColor }
}
