import { observer } from "mobx-react-lite"
import * as React from "react"
import { ActivityIndicator, StyleProp, View, ViewStyle } from "react-native"
import { colors } from "../theme"

export interface LoaderProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  /**
   * Loading status
   */
  loading: boolean
  /**
   * Content
   */
  children: React.ReactNode
  /**
   * Inidicator color
   */
  color?: string
}

/**
 * Loader component
 */
export const Loader = observer(function Loader(props: LoaderProps) {
  const { style, loading, children, color = colors.palette.neutral100 } = props
  const $styles = [$container, style]

  return (
    <View style={$styles}>
      {children}
      {loading && (
        <View style={$loading}>
          <ActivityIndicator size="large" color={color} />
        </View>
      )}
    </View>
  )
})

const $container: ViewStyle = {
  flex: 1,
}

const $loading: ViewStyle = {
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  alignItems: "center",
  justifyContent: "center",
}
