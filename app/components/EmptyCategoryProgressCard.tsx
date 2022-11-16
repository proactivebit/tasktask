import { observer } from "mobx-react-lite"
import * as React from "react"
import { StyleProp, View, ViewStyle } from "react-native"
import { spacing } from "../theme"
import { CardWrapper } from "./CardWrapper"

export interface EmptyCategoryProgressCardProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Show when no category present
 */
export const EmptyCategoryProgressCard = observer(function EmptyCategoryProgressCard(
  props: EmptyCategoryProgressCardProps,
) {
  const { style } = props
  const $styles = [$container, style]

  return (
    <CardWrapper style={$styles}>
      <View style={$content}></View>
    </CardWrapper>
  )
})

const $container: ViewStyle = {
  padding: spacing.medium,
}

const $content: ViewStyle = {
  height: 80,
  width: 170,
}
