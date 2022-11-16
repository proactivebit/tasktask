import { observer } from "mobx-react-lite"
import React, { FC, useCallback, useRef } from "react"
import { ViewStyle } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { CategoryCard, CircleButton, Header, Screen } from "../components"
import { useCategories } from "../hooks/useCategories"
import { useStores } from "../models"
import { CategoryScreenProps } from "../navigators/CategoryNavigator"
import { colors, spacing } from "../theme"

interface CategoriesScreenProps extends CategoryScreenProps<"Categories"> {}

export const CategoriesScreen: FC<CategoriesScreenProps> = observer(function CategoriesScreen(
  props,
) {
  const { navigation } = props
  useCategories()
  const {
    categoryStore,
    authenticationStore: { user },
  } = useStores()
  const scrollRef = useRef()

  const onDismiss = useCallback((categoryId: string) => {
    categoryStore.removeCategory(categoryId, user.uid)
  }, [])

  const navigateToAddCategory = () => {
    navigation.navigate("AddCategory")
  }

  return (
    <Screen
      style={$root}
      preset="scroll"
      safeAreaEdges={["bottom"]}
      statusBarStyle="light"
      contentContainerStyle={{ flex: 1 }}
    >
      <Header leftIcon="back" onLeftPress={() => navigation.goBack()} leftIconColor={colors.text} />
      <ScrollView ref={scrollRef} showsVerticalScrollIndicator={false}>
        {categoryStore.categories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            onDismiss={onDismiss}
            simultaneousHandlers={scrollRef}
          />
        ))}
      </ScrollView>

      <CircleButton style={$addButton} onPress={navigateToAddCategory} />
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
  paddingHorizontal: spacing.large,
}

const $addButton: ViewStyle = {
  position: "absolute",
  bottom: spacing.large,
  right: spacing.large,
}
