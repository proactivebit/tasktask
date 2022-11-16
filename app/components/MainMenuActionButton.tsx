import * as React from "react"
import { StyleProp, TextStyle, ViewStyle } from "react-native"
import { colors, typography } from "../theme"
import { DrawerIconButton } from "./DrawerIconButton"
import { MenuContext } from "./MainMenu"

export interface MainMenuActionButtonProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Menu action button like show/hide menu
 */
export const MainMenuActionButton = function MainMenuActionButton(
  props: MainMenuActionButtonProps,
) {
  const { style } = props
  const $styles = [$container, style]
  const { open, toggleMenu, progress } = React.useContext(MenuContext)

  return <DrawerIconButton onPress={toggleMenu} {...{ open, progress }} />
}

const $container: ViewStyle = {
  justifyContent: "center",
}

const $text: TextStyle = {
  fontFamily: typography.primary.normal,
  fontSize: 14,
  color: colors.palette.primary500,
}
