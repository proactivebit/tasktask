import { observer } from "mobx-react-lite"
import * as React from "react"
import {
  Dimensions,
  Modal,
  ModalBaseProps,
  StyleProp,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from "react-native"
import { colors, spacing } from "../theme"

const { width: SCREEN_WIDTH } = Dimensions.get("screen")
const MODAL_WIDTH = SCREEN_WIDTH - spacing.extraLarge * 2

export interface ModalWrapperProps extends Pick<ModalBaseProps, "visible"> {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  /**
   * Modal content
   */
  children: React.ReactChild
  /**
   * Set modal visibility
   */
  setModalVisible: (visible: boolean) => void
}

/**
 * Wrapper around content that should be in modal
 */
export const ModalWrapper = observer(function ModalWrapper(props: ModalWrapperProps) {
  const { style, visible, children, setModalVisible } = props
  const $styles = [$modalView, style]

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
        <View style={$centeredView}>
          <View style={$styles}>{children}</View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
})

const $centeredView: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  marginTop: 22,
}

const $modalView: ViewStyle = {
  backgroundColor: colors.palette.neutral100,
  padding: spacing.extraLarge,
  width: MODAL_WIDTH,
  borderRadius: 20,
}
