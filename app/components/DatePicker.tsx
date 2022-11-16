import DateTimePicker from "@react-native-community/datetimepicker"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { useState } from "react"
import { StyleProp, View, ViewStyle } from "react-native"

export interface DatePickerProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  /**
   * The currently selected date.
   */
  value: Date
  /**
   * Date change handler.
   */
  onChange: (dates: Date) => void
  /**
   * Presable component
   */
  pressableCompoent: (value: Date, toogle: () => void) => React.ReactNode
}

/**
 * Date picker componenet
 */
export const DatePicker = observer(function DatePicker(props: DatePickerProps) {
  const { style, value, onChange, pressableCompoent } = props
  const $styles = [$container, style]
  const [show, setShow] = useState(false)

  const onDateChange = (event, selectedDate) => {
    const currentDate = new Date(selectedDate.toDateString())
    setShow(false)
    onChange(currentDate)
  }

  const tooglePicker = () => {
    setShow((prev) => !prev)
  }

  return (
    <View style={$styles}>
      {pressableCompoent(value, tooglePicker)}
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={value}
          mode={"date"}
          onChange={onDateChange}
          textColor="white"
          themeVariant="dark"
        />
      )}
    </View>
  )
})

const $container: ViewStyle = {
  justifyContent: "center",
}
