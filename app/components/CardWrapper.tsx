import { observer } from "mobx-react-lite"
import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { colors, spacing, typography } from "../theme"

export interface CardWrapperProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  /**
   * Children components.
   */
  children: React.ReactNode
}

/**
 * General component for card ui element
 */
export const CardWrapper = observer(function CardWrapper(props: CardWrapperProps) {
  const { style, children } = props
  const $styles = [$container, style]

  return <View style={$styles}>{children}</View>
})

const $container: ViewStyle = {
  backgroundColor: colors.cardBackground,
  borderRadius: 20,
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 3,
  },
  shadowOpacity: 0.36,
  shadowRadius: 6.68,
  elevation: 11,
  margin: spacing.small,
}

const $text: TextStyle = {
  fontFamily: typography.primary.normal,
  fontSize: 14,
  color: colors.palette.primary500,
}
