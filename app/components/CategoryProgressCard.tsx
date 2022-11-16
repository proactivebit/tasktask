import { observer } from "mobx-react-lite"
import * as React from "react"
import { StyleProp, TextStyle, ViewStyle } from "react-native"
import { CategorySummary } from "../models"
import { colors, spacing } from "../theme"
import { CardWrapper } from "./CardWrapper"
import { ProgressBar } from "./ProgressBar"
import { Text } from "./Text"

export interface CategoryProgressCardProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  /**
   * Data about category like no of tasks, category name, tasks done
   */
  categorySummary: CategorySummary
}

/**
 * Card with category details like no of tasks in category, progress
 */
export const CategoryProgressCard = observer(function CategoryProgressCard(
  props: CategoryProgressCardProps,
) {
  const { style, categorySummary } = props
  const $styles = [$container, style]

  return (
    <CardWrapper style={$styles}>
      <Text style={$secondaryText} size="xs">
        {categorySummary.taskCount} Tasks
      </Text>
      <Text size="md" preset="bold">
        {categorySummary.name}
      </Text>
      <ProgressBar
        style={$progressBar}
        progress={
          categorySummary.tasksDone /
          (categorySummary.taskCount === 0 ? 1 : categorySummary.taskCount)
        }
      />
    </CardWrapper>
  )
})

const $container: ViewStyle = {
  padding: spacing.medium,
}

const $text: TextStyle = {}

const $secondaryText: TextStyle = {
  color: colors.palette.primary300,
}

const $progressBar: ViewStyle = {
  marginTop: spacing.medium,
}
