import { observer } from "mobx-react-lite"
import * as React from "react"
import { ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { PanGestureHandlerProps } from "react-native-gesture-handler"
import { useCategoryColor } from "../hooks/useCategoryColor"
import { Task } from "../models"
import { colors, spacing, typography } from "../theme"
import { RemovableCard } from "./RemovableCard"
import { Toggle } from "./Toggle"

export interface TaskCardProps extends Pick<PanGestureHandlerProps, "simultaneousHandlers"> {
  /**
   * Task data
   */
  task: Task
  /**
   * On dismiss callback
   */
  onDismiss: (taskId: string) => void
}

/**
 * Task item
 */
export const TaskCard = observer(function TaskCard(props: TaskCardProps) {
  const { task, onDismiss, simultaneousHandlers } = props

  const $taskText = [$text, task.done && $textTaskDone]

  const setTaskStatus = () => {
    task.setStatus(!task.done)
  }

  const hanleOnDimiss = () => {
    onDismiss(task.id)
  }

  const { color } = useCategoryColor(task.category)

  let $toggleOuterStyle = [$toggleOuter, { borderColor: color }, task.done && $toggleOuterChecked]

  return (
    <RemovableCard simultaneousHandlers={simultaneousHandlers} onDismiss={hanleOnDimiss}>
      <View style={$task}>
        <Toggle
          containerStyle={$toogle}
          variant="checkbox"
          value={task.done}
          onPress={setTaskStatus}
          label={task.task}
          labelStyle={$taskText}
          inputInnerStyle={$toggleInner}
          inputDetailStyle={$toggleDetails}
          inputOuterStyle={$toggleOuterStyle as ViewStyle}
        />
      </View>
    </RemovableCard>
  )
})

const $toggleInner: ViewStyle = {
  backgroundColor: colors.palette.secondary300,
}

const $toggleDetails: ViewStyle & ImageStyle = {
  tintColor: colors.palette.neutral100,
}

const $toggleOuter: ViewStyle = {
  borderRadius: 90,
  backgroundColor: colors.cardBackground,
  width: 30,
  height: 30,
}

const $toggleOuterChecked: ViewStyle = {
  borderColor: colors.cardBackground,
}

const $toogle: ViewStyle = {
  marginRight: spacing.medium,
}

const $text: TextStyle = {
  fontFamily: typography.primary.normal,
  fontSize: 14,
  color: colors.text,
  flexShrink: 1,
}

const $textTaskDone: TextStyle = {
  textDecorationLine: "line-through",
}

const $task: ViewStyle = {}
