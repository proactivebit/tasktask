import { FontAwesome5 } from "@expo/vector-icons"
import { isToday } from "date-fns"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { useCallback, useRef, useState } from "react"
import { StyleProp, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { useTasks } from "../hooks"
import { translate } from "../i18n"
import { useStores } from "../models"
import { colors, spacing } from "../theme"
import { formatDate } from "../utils/formatDate"
import { DatePicker } from "./DatePicker"
import { SectionHeader } from "./SectionHeader"
import { TaskCard } from "./TaskCard"

export interface TaskSectionProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Group all tasks
 */
export const TaskSection = observer(function TaskSection(props: TaskSectionProps) {
  const { style } = props
  const $styles = [$container, style]
  const [date, setDate] = useState(new Date())
  const { taskStore } = useStores()
  useTasks(date)
  const scrollRef = useRef()

  const onDismiss = useCallback((taskId: string) => {
    taskStore.removeTask(taskId)
  }, [])

  return (
    <View style={$styles}>
      <View>
        <DatePicker
          value={date}
          onChange={setDate}
          pressableCompoent={(value, toogle) => (
            <TouchableOpacity style={$textContainer} onPress={toogle}>
              <SectionHeader
                text={
                  isToday(value)
                    ? translate("taskSectionComponent.name")
                    : formatDate(value.toISOString())
                }
              ></SectionHeader>
              <FontAwesome5 style={$icon} name="angle-right" color={colors.palette.primary200} />
            </TouchableOpacity>
          )}
        />
      </View>
      <View style={$tasksWrapper}>
        <ScrollView ref={scrollRef} showsVerticalScrollIndicator={false}>
          {taskStore.filterTasksByDate(date).map((task) => {
            return (
              <TaskCard
                key={task.id}
                task={task}
                onDismiss={onDismiss}
                simultaneousHandlers={scrollRef}
              />
            )
          })}
        </ScrollView>
      </View>
    </View>
  )
})

const $container: ViewStyle = {
  flex: 1,
}

const $textContainer: TextStyle = {
  flexDirection: "row",
  alignItems: "center",
}

const $icon: ViewStyle = {
  marginLeft: spacing.tiny,
}

const $tasksWrapper: ViewStyle = {
  marginTop: spacing.extraSmall,
}
