import { FontAwesome5 } from "@expo/vector-icons"
import { OAuthCredential } from "@firebase/auth"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { useEffect } from "react"
import { Alert, StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { useGoogleAuthentication } from "../hooks/useGoogleAuthentication"
import { colors, typography } from "../theme"
import { Button } from "./Button"

export interface GoogleSignInProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  /**
   * callback after success login, pass credentials
   */
  onSuccessLogin: (credentials: OAuthCredential) => void
}

/**
 * Login with google button with action to call google service
 */
export const GoogleSignIn = observer(function GoogleSignIn(props: GoogleSignInProps) {
  const { style, onSuccessLogin } = props
  const $styles = [$container, style]
  const [authWithGoogle, credentials] = useGoogleAuthentication()

  async function loginWithGoogle() {
    try {
      await authWithGoogle()
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
        LeftAccessory={(props) => <FontAwesome5 {...props} name="google" color="white" />}
        tx="googleSignInComponent.button"
        preset="filled"
        textStyle={$buttonText}
        onPress={loginWithGoogle}
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
  backgroundColor: "#dd4935",
}

const $buttonText: TextStyle = {
  color: "white",
}
