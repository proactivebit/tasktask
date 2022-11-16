import type { AuthCredential } from "@firebase/auth"
import { observer } from "mobx-react-lite"
import React, { FC, useState } from "react"
import { View, ViewStyle } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Loader, Text } from "../components"
import { AppleSignIn } from "../components/AppleSignIn"
import { GoogleSignIn } from "../components/GoogleSignIn"
import { useAppleSignIsAvailable } from "../hooks/useAppleSignIsAvailable"
import { useStores } from "../models"
import { AppStackScreenProps } from "../navigators"
import { authenticationService } from "../services/firebase/authenticationService"
import { colors, spacing } from "../theme"

interface WelcomeScreenProps extends AppStackScreenProps<"Login"> {}

export const LoginScreen: FC<WelcomeScreenProps> = observer(function WelcomeScreen() {
  const [loading, setLoading] = useState(false)
  const isAppleSignInAvailable = useAppleSignIsAvailable()

  const { authenticationStore } = useStores()

  async function login(credential: AuthCredential, data?: any) {
    if (!credential) {
      return
    }
    setLoading(true)
    const user = await authenticationService.loginWithCredential(credential, data)
    authenticationStore.setUser(user)
    setLoading(false)
  }

  return (
    <Loader loading={loading} color={colors.palette.neutral900}>
      <View style={$container}>
        <View style={$topContainer}>
          <Text style={{ color: colors.palette.primary500 }} text="Task" preset="heading" />
          <Text text="Task" preset="heading" />
        </View>
        <SafeAreaView style={$bottomContainer} edges={["bottom"]}>
          <GoogleSignIn onSuccessLogin={login} />
          {isAppleSignInAvailable && <AppleSignIn style={$appleButton} onSuccessLogin={login} />}
        </SafeAreaView>
      </View>
    </Loader>
  )
})

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
}

const $topContainer: ViewStyle = {
  flexShrink: 1,
  flexGrow: 1,
  flexBasis: "50%",
  justifyContent: "center",
  flexDirection: "row",
  alignItems: "center",
  paddingHorizontal: spacing.large,
}

const $bottomContainer: ViewStyle = {
  flexShrink: 1,
  flexGrow: 0,
  flexBasis: "50%",
  justifyContent: "center",
  backgroundColor: colors.palette.neutral100,
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  paddingHorizontal: spacing.large,
  paddingBottom: spacing.large,
}

const $appleButton: ViewStyle = {
  marginTop: spacing.large,
}
