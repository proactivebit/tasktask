import { observer } from "mobx-react-lite"
import * as React from "react"
import { StyleProp, TextInput, TextInputProps, TextStyle } from "react-native"
import { translate } from "../i18n"
import { colors, typography } from "../theme"
import { TextProps } from "./Text"

export interface TextFieldNoBordersProps extends Omit<TextInputProps, "ref"> {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<TextStyle>
  /**
   * Placeholder text which is looked up via i18n.
   */
  placeholderTx?: TextProps["tx"]
  /**
   * Reference to input
   */
  forwardRef?: React.MutableRefObject<TextInput>
}

/**
 * Describe your component here
 */
export const TextFieldNoBorders = observer(function TextFieldNoBorders(
  props: TextFieldNoBordersProps,
) {
  const { style, placeholderTx, placeholder, forwardRef, ...TextInputProps } = props
  const $styles = [$text, style]
  const placeholderContent = placeholderTx ? translate(placeholderTx) : placeholder

  return (
    <TextInput
      ref={forwardRef}
      style={$styles}
      placeholder={placeholderContent}
      placeholderTextColor={colors.placeholder}
      selectionColor={"white"}
      {...TextInputProps}
    />
  )
})

const $text: TextStyle = {
  fontFamily: typography.primary.normal,
  fontSize: 25,
  color: colors.text,
}
