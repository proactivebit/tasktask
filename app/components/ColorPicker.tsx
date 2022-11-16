import { observer } from "mobx-react-lite"
import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { colors, typography } from "../theme"

const colorsToPick = ["#80ED99", "#3772FF", "#B1EDE8", "#9A48D0", "#FEDC97", "#830A48"]

export interface ColorPickerProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  /**
   * On select color
   */
  onSelect: (color: string) => void
  /**
   * Color selected
   */
  selectedColor: string
}

/**
 * Color picker
 */
export const ColorPicker = observer(function ColorPicker(props: ColorPickerProps) {
  const { style, onSelect, selectedColor } = props
  const $styles = [$container, style]

  return (
    <View style={$styles}>
      {colorsToPick.map((color) => (
        <TouchableOpacity
          key={color}
          onPress={() => onSelect(color)}
          style={[$color, { backgroundColor: color }, selectedColor === color && $colorSelected]}
        />
      ))}
    </View>
  )
})

const $container: ViewStyle = {
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-between",
}

const $text: TextStyle = {
  fontFamily: typography.primary.normal,
  fontSize: 14,
  color: colors.palette.primary500,
}

const $color: ViewStyle = {
  width: 50,
  height: 50,
  margin: 20,
}

const $colorSelected: ViewStyle = {
  borderWidth: 3,
  borderColor: "white",
}
