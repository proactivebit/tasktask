import { observer } from "mobx-react-lite"
import * as React from "react"
import { ViewStyle } from "react-native"
import { colors, spacing } from "../theme"
import { Toggle } from "./Toggle"

export interface TaskDoneButtonProps {
  /**
   * Toogle value
   */
  value: boolean
  /**
   * Set toogle value
   */
  setValue: (value: boolean) => void
}

/**
 * Task done buttton
 */
export const TaskDoneButton = observer(function TaskDoneButton(props: TaskDoneButtonProps) {
  const { value, setValue } = props

  return (
    <Toggle
      inputOuterStyle={value ? $toogleOn : $toogleOff}
      inputInnerStyle={{
        backgroundColor: colors.palette.secondary300,
      }}
      inputDetailStyle={{ tintColor: "white" }}
      variant="checkbox"
      value={value}
      onValueChange={setValue}
    />
  )
})

const $toogleOff: ViewStyle = {
  borderRadius: 90,
  borderColor: colors.palette.accent500,
  marginRight: spacing.medium,
  backgroundColor: colors.cardBackground,
  borderWidth: 1,
  height: 25,
  width: 25,
}

const $toogleOn: ViewStyle = {
  ...$toogleOff,
  borderColor: colors.palette.secondary300,
}
