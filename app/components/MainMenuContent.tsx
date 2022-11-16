import { FontAwesome5 } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import * as React from "react"
import { useRef } from "react"
import { FlatList, ImageStyle, StyleProp, View, ViewStyle } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { colors, spacing } from "../theme"
import { Button } from "./Button"
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
  const menuRef = useRef<FlatList>()
  const navigation = useNavigation<any>()

  const navigateToCategories = () => {
    navigation.navigate("Category", { screen: "Categories" })
  }

  return (
    <SafeAreaView style={$styles} edges={["top", "bottom"]}>
      <View style={$logoContainer}>
        <Text tx="common.appName" preset="heading" />
      </View>
      <View style={$menu}>
        <Button
          LeftAccessory={(props) => <FontAwesome5 {...props} name="bell" color="white" size="20" />}
          tx="mainMenu.categories"
          preset="outline"
          onPress={navigateToCategories}
        ></Button>
      </View>
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

const $logoImage: ImageStyle = {
  height: 42,
  width: 77,
}

const $flatListContentContainer: ViewStyle = {
  paddingHorizontal: spacing.large,
}
