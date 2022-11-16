import { observer } from "mobx-react-lite"
import * as React from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { PanGestureHandlerProps } from "react-native-gesture-handler"
import { Category } from "../models/Category"
import { colors, spacing, typography } from "../theme"
import { RemovableCard } from "./RemovableCard"
import { Text } from "./Text"

export interface CategoryCardProps extends Pick<PanGestureHandlerProps, "simultaneousHandlers"> {
  /**
   * Category data
   */
  category: Category
  /**
   * On dismiss callback
   */
  onDismiss: (categoryId: string) => void
}

/**
 * Describe your component here
 */
export const CategoryCard = observer(function CategoryCard(props: CategoryCardProps) {
  const { simultaneousHandlers, onDismiss, category } = props

  const hanleOnDimiss = () => {
    onDismiss(category.id)
  }

  return (
    <RemovableCard simultaneousHandlers={simultaneousHandlers} onDismiss={hanleOnDimiss}>
      <View style={$category}>
        <View style={[$colorIndicator, { backgroundColor: category.color }]}></View>
        <Text style={$text} size="md">
          {category.name}
        </Text>
      </View>
    </RemovableCard>
  )
})

const $text: TextStyle = {
  fontFamily: typography.primary.normal,
  fontSize: 14,
  color: colors.text,
  flexShrink: 1,
}

const $category: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
}

const $colorIndicator: ViewStyle = {
  width: 25,
  height: 25,
  borderRadius: 90,
  marginRight: spacing.medium,
}
