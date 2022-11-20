import { observer } from "mobx-react-lite"
import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { colors, spacing } from "../theme"
import { Button } from "./Button"
import { ModalWrapper, ModalWrapperProps } from "./ModalWrapper"
import { Text, TextProps } from "./Text"

export interface ConfirmationModalProps extends Omit<ModalWrapperProps, "children">, TextProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  /**
   * On accept callback
   */
  onAccept: () => void
}

/**
 * Confirmation message with buttons accept or decline
 */
export const ConfirmationModal = observer(function ConfirmationModal(
  props: ConfirmationModalProps,
) {
  const { style, visible, setModalVisible, onAccept, ...rest } = props

  return (
    <ModalWrapper style={style} visible={visible} setModalVisible={setModalVisible}>
      <View>
        <Text {...rest} style={$text} />
        <View style={$buttonsContainer}>
          <Button
            style={$button}
            tx="common.cancel"
            preset="default"
            onPress={() => {
              setModalVisible(false)
            }}
          ></Button>
          <Button
            textStyle={$acceptButtonText}
            style={[$button, $acceptButton]}
            tx="common.accept"
            preset="default"
            onPress={onAccept}
          ></Button>
        </View>
      </View>
    </ModalWrapper>
  )
})

const $text: TextStyle = {
  color: colors.palette.neutral900,
  textAlign: "center",
}

const $button: ViewStyle = {}

const $acceptButton: ViewStyle = {
  backgroundColor: colors.cardBackground,
}

const $acceptButtonText: TextStyle = {
  color: colors.palette.neutral100,
}

const $buttonsContainer: ViewStyle = {
  marginTop: spacing.medium,
  flexDirection: "row",
  justifyContent: "space-around",
}
