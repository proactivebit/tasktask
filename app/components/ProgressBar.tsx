import { observer } from "mobx-react-lite"
import * as React from "react"
import { StyleProp, View, ViewStyle } from "react-native"
import * as Progress from "react-native-progress"
import { colors } from "../theme"

export interface ProgressBarProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  /**
   * How much progress is filled
   */
  progress: number
}

/**
 * Describe your component here
 */
export const ProgressBar = observer(function ProgressBar(props: ProgressBarProps) {
  const { style, progress } = props
  const $styles = [$container, style]

  return (
    <View style={$styles}>
      <Progress.Bar
        progress={progress}
        width={200}
        color={colors.palette.accent500}
        unfilledColor={colors.palette.primary100}
        borderWidth={0}
      />
    </View>
  )
})

const $container: ViewStyle = {
  justifyContent: "center",
}
