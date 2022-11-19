import { FontAwesome5 } from "@expo/vector-icons"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { useEffect } from "react"
import { Alert, StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { useAppleAuthentication } from "../hooks/useAppleAuthentication"
import { colors, typography } from "../theme"
import { Button } from "./Button"
import { GoogleSignInProps } from "./GoogleSignIn"

export interface AppleSignInProps extends Pick<GoogleSignInProps, "onSuccessLogin"> {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Login with apple button with action to call apple service
 */
export const AppleSignIn = observer(function AppleSignIn(props: AppleSignInProps) {
  const { style, onSuccessLogin } = props
  const $styles = [$container, style]
  const [authWithApple, credentials] = useAppleAuthentication()

  async function loginWithApple() {
    try {
      await authWithApple()
    } catch (error: any) {
      console.error(error)
      Alert.alert("Error", "Something went wrong. Please try again later.")
    }
  }

  useEffect(() => {
    onSuccessLogin(credentials)
  }, [credentials])

  return (
    <View style={$styles}>
      <Button
        LeftAccessory={(props) => <FontAwesome5 {...props} name="apple" color="white" />}
        tx="appleSignInComponent.button"
        preset="filled"
        textStyle={$buttonText}
        onPress={loginWithApple}
        style={$button}
      ></Button>
    </View>
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

const $button: ViewStyle = {
  backgroundColor: "black",
}

const $buttonText: TextStyle = {
  color: "white",
}
