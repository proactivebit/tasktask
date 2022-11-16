import { FontAwesome5 } from "@expo/vector-icons"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { Dimensions, StyleProp, TextStyle, ViewStyle } from "react-native"
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  PanGestureHandlerProps,
} from "react-native-gesture-handler"
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated"
import { colors, spacing, typography } from "../theme"

export const TASK_CARD_HEIGHT = 60

const { width: SCREEN_WIDTH } = Dimensions.get("window")

const TRANSLATE_X_THRESHOLD = -SCREEN_WIDTH * 0.2

export interface RemovableCardProps extends Pick<PanGestureHandlerProps, "simultaneousHandlers"> {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  /**
   * On dismiss callback
   */
  onDismiss: () => void
  /**
   * Content
   */
  children: React.ReactElement
}

/**
 * Reamovable card wrapper
 */
export const RemovableCard = observer(function RemovableCard(props: RemovableCardProps) {
  const { style, simultaneousHandlers, onDismiss, children } = props
  const $styles = [$container, style]

  const translateX = useSharedValue(0)
  const itemHeight = useSharedValue(TASK_CARD_HEIGHT)
  const marginVertical = useSharedValue(8)
  const opacity = useSharedValue(1)

  const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onActive: (event) => {
      translateX.value = event.translationX
    },
    onEnd: () => {
      const shouldBeDismised = translateX.value < TRANSLATE_X_THRESHOLD
      if (shouldBeDismised) {
        translateX.value = withTiming(-SCREEN_WIDTH)
        itemHeight.value = withTiming(0)
        marginVertical.value = withTiming(0)
        opacity.value = withTiming(0)
        opacity.value = withTiming(0, undefined, (isFinished) => {
          if (isFinished) {
            runOnJS(onDismiss)()
          }
        })
      } else {
        translateX.value = withTiming(0)
      }
    },
  })

  const rStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value,
      },
    ],
  }))

  const rIconContainerStyle = useAnimatedStyle(() => {
    const opacity = withTiming(translateX.value < TRANSLATE_X_THRESHOLD ? 1 : 0)
    return { opacity }
  })

  const rTaskContainerStyle = useAnimatedStyle(() => {
    return {
      height: itemHeight.value,
      marginTop: marginVertical.value,
      opacity: opacity.value,
    }
  })

  return (
    <Animated.View style={[$styles, rTaskContainerStyle]}>
      <Animated.View style={$iconWrapper}>
        <Animated.View style={[$iconContainer, rIconContainerStyle]}>
          <FontAwesome5 name="trash-alt" size={TASK_CARD_HEIGHT * 0.4} color={"red"} />
        </Animated.View>
      </Animated.View>
      <PanGestureHandler simultaneousHandlers={simultaneousHandlers} onGestureEvent={panGesture}>
        <Animated.View style={[$task, rStyle]}>{children}</Animated.View>
      </PanGestureHandler>
    </Animated.View>
  )
})

const $container: ViewStyle = {
  justifyContent: "center",
}

const $text: TextStyle = {
  fontFamily: typography.primary.normal,
  fontSize: 14,
  color: colors.palette.primary500,
}

const $task: ViewStyle = {
  justifyContent: "center",
  height: TASK_CARD_HEIGHT,
  backgroundColor: colors.cardBackground,
  borderRadius: 20,
  paddingLeft: spacing.medium,
}

const $iconContainer: ViewStyle = {
  height: TASK_CARD_HEIGHT,
  width: TASK_CARD_HEIGHT,
  position: "absolute",
  right: "5%",
  justifyContent: "center",
  alignItems: "center",
}

const $iconWrapper: ViewStyle = {
  backgroundColor: colors.palette.neutral100,
  position: "absolute",
  height: TASK_CARD_HEIGHT,
  width: "100%",
  borderRadius: 20,
}
