import Ionicons from "@expo/vector-icons/MaterialCommunityIcons"
import { isToday } from "date-fns"
import * as React from "react"
import { useMemo } from "react"
import { StyleProp, ViewStyle } from "react-native"
import { translate } from "../i18n"
import { formatDate } from "../utils/formatDate"
import { Button, ButtonProps } from "./Button"

export interface ButtonCalendarProps extends ButtonProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  /**
   * Date label
   */
  date: Date
}

/**
 * Button with date
 */
export const ButtonCalendar = function ButtonCalendar(props: ButtonCalendarProps) {
  const { style, onPress, date } = props
  const $styles = [$container, style]

  const formatedDate = useMemo(() => {
    const selected = formatDate(date.toISOString())
    return isToday(date) ? translate("buttonCalendar.currentDay") : selected
  }, [date])

  return (
    <Button
      onPress={onPress}
      style={$styles}
      preset="outline"
      text={formatedDate}
      LeftAccessory={(props) => <Ionicons {...props} name="calendar" size={30} color="white" />}
    ></Button>
  )
}

const $container: ViewStyle = {
  width: 200,
}
