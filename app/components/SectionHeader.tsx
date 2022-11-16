import { observer } from "mobx-react-lite"
import * as React from "react"
import { TextStyle } from "react-native"
import { colors } from "../theme"
import { Text, TextProps } from "./Text"

export interface SectionHeaderProps extends TextProps {}

/**
 * Name of the section
 */
export const SectionHeader = observer(function SectionHeader(props: SectionHeaderProps) {
  return <Text size="xs" style={$text} {...props} />
})

const $text: TextStyle = {
  color: colors.palette.primary200,
  letterSpacing: 3,
}
