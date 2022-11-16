import * as React from "react"
import { useRef } from "react"
import { StyleProp, TextStyle, ViewStyle } from "react-native"
import { DrawerLayout } from "react-native-gesture-handler"
import { SharedValue, useSharedValue } from "react-native-reanimated"
import { colors, typography } from "../theme"

interface IMenuContext {
  open: boolean
  setOpen: (open: boolean) => void
  toggleMenu: () => void
  progress: SharedValue<number>
  drawerRef: React.MutableRefObject<DrawerLayout>
}

/**
 * Context to handle menu action
 */
export const MenuContext = React.createContext<IMenuContext | undefined>(undefined)

export interface MainMenuProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  /**
   * Other menu elements
   */
  children: React.ReactNode
}

/**
 * Main menu context wrapper
 */
export const MainMenu = function MainMenu(props: MainMenuProps) {
  const { style } = props
  const $styles = [$container, style]
  const [open, setOpen] = React.useState(false)
  const progress = useSharedValue(0)
  const drawerRef = useRef<DrawerLayout>()

  const toggleMenu = () => {
    if (!open) {
      setOpen(true)
      drawerRef.current?.openDrawer({ speed: 2 })
    } else {
      setOpen(false)
      drawerRef.current?.closeDrawer({ speed: 2 })
    }
  }

  return (
    <MenuContext.Provider value={{ open, setOpen, toggleMenu, progress, drawerRef }}>
      {props.children}
    </MenuContext.Provider>
  )
}

const $container: ViewStyle = {
  justifyContent: "center",
}

const $text: TextStyle = {
  fontFamily: typography.primary.normal,
  fontSize: 14,
  color: colors.palette.primary500,
}
