import * as Localization from "expo-localization"
import * as React from "react"
import { StyleProp, ViewStyle } from "react-native"
import { DrawerLayout, DrawerState } from "react-native-gesture-handler"
import { colors } from "../theme"
import { MenuContext } from "./MainMenu"
import { MainMenuContent } from "./MainMenuContent"

export const isRTL = Localization.isRTL

export interface MainMenuWrapperProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  /**
   * Main content
   */
  children: React.ReactNode
}

/**
 * Menu wrapper
 */
export const MainMenuWrapper = function MainMenuWrapper(props: MainMenuWrapperProps) {
  const { style, children } = props
  const $styles = [$container, style]

  const { progress, drawerRef, setOpen } = React.useContext(MenuContext)

  return (
    <DrawerLayout
      ref={drawerRef}
      drawerWidth={326}
      drawerType={"slide"}
      drawerPosition={isRTL ? "right" : "left"}
      drawerBackgroundColor={colors.palette.neutral100}
      overlayColor={colors.palette.overlay20}
      onDrawerSlide={(drawerProgress) => {
        progress.value = open ? 1 - drawerProgress : drawerProgress
      }}
      onDrawerStateChanged={(newState: DrawerState, drawerWillShow: boolean) => {
        if (newState === "Settling") {
          setOpen(drawerWillShow)
        }
      }}
      renderNavigationView={() => {
        return <MainMenuContent />
      }}
    >
      {children}
    </DrawerLayout>
  )
}

const $container: ViewStyle = {
  justifyContent: "center",
}
