import { FontAwesome5 } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import * as React from "react"
import { useState } from "react"
import { Linking, StyleProp, View, ViewStyle } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useStores } from "../models"
import { colors, spacing } from "../theme"
import { Button } from "./Button"
import { ConfirmationModal } from "./ConfirmationModal"
import { Text } from "./Text"

export interface MainMenuContentProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Menu content
 */
export const MainMenuContent = function MainMenuContent(props: MainMenuContentProps) {
  const { style } = props
  const $styles = [$container, style]
  const navigation = useNavigation<any>()
  const { authenticationStore } = useStores()
  const [deleteUserModal, setDeleteUserModal] = useState(false)

  const navigateToCategories = () => {
    navigation.navigate("Category", { screen: "Categories" })
  }

  const logout = () => {
    authenticationStore.logout()
  }

  const removeAccount = () => {
    setDeleteUserModal(true)
  }

  const handleRemoveAccount = () => {
    setDeleteUserModal(false)
    authenticationStore.removeAccount()
  }

  return (
    <SafeAreaView style={$styles} edges={["top", "bottom"]}>
      <View style={$logoContainer}>
        <Text tx="common.appName" preset="heading" />
      </View>
      <View style={$menu}>
        <Button
          style={$button}
          LeftAccessory={(props) => <FontAwesome5 {...props} name="layer-group" color="white" />}
          tx="mainMenu.categories"
          preset="outline"
          onPress={navigateToCategories}
        ></Button>
        <Button
          style={$button}
          LeftAccessory={(props) => <FontAwesome5 {...props} name="sign-out-alt" color="white" />}
          tx="common.logout"
          preset="outline"
          onPress={logout}
        ></Button>
        <Button
          style={$button}
          LeftAccessory={(props) => <FontAwesome5 {...props} name="user-slash" color="white" />}
          tx="account.remove"
          preset="outline"
          onPress={removeAccount}
        ></Button>
        <Button
          style={$button}
          LeftAccessory={(props) => <FontAwesome5 {...props} name="user-shield" color="white" />}
          tx="mainMenu.privacyPolicy"
          preset="outline"
          onPress={() => Linking.openURL("https://tasktask-62204.web.app")}
        ></Button>
        <Button
          style={$button}
          LeftAccessory={(props) => <FontAwesome5 {...props} name="user-shield" color="white" />}
          tx="mainMenu.termsAndConditions"
          preset="outline"
          onPress={() => Linking.openURL("https://tasktask-62204.web.app/termsandconitions.html")}
        ></Button>
      </View>
      <ConfirmationModal
        setModalVisible={setDeleteUserModal}
        visible={deleteUserModal}
        tx="confirmationMessage.deleteUser"
        onAccept={handleRemoveAccount}
      />
    </SafeAreaView>
  )
}

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.cardBackground,
  padding: spacing.extraLarge,
}

const $logoContainer: ViewStyle = {
  alignSelf: "flex-start",
  height: 56,
  paddingHorizontal: spacing.large,
}

const $menu: ViewStyle = {}

const $button: ViewStyle = {
  marginTop: spacing.medium,
}
