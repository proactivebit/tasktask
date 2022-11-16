import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { View, ViewStyle } from "react-native"
import { MainMenu, MainMenuActionButton, MainMenuWrapper, Screen } from "../components"
import { CategorySection } from "../components/CategorySection"
import { CircleButton } from "../components/CircleButton"
import { TaskSection } from "../components/TaskSection"
import { useStores } from "../models"
import { ToDoScreenProps } from "../navigators/ToDoNavigator"
import { colors, spacing } from "../theme"

interface HomeScreenProps extends ToDoScreenProps<"Home"> {}

export const HomeScreen: FC<HomeScreenProps> = observer(function HomeScreen(_props) {
  const { navigation } = _props
  const { authenticationStore } = useStores()

  const navigateToAddToDo = () => {
    navigation.navigate("AddToDo")
  }

  return (
    <MainMenu>
      <MainMenuWrapper>
        <Screen
          preset="fixed"
          safeAreaEdges={["top", "bottom"]}
          style={$root}
          contentContainerStyle={$rootInner}
          statusBarStyle="light"
        >
          <MainMenuActionButton />
          <View style={$content}>
            <CategorySection />
            <TaskSection />
          </View>
          <CircleButton style={$addButton} onPress={navigateToAddToDo} />
        </Screen>
      </MainMenuWrapper>
    </MainMenu>
  )
})

const $root: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
}

const $rootInner: ViewStyle = {
  flex: 1,
}

const $content: ViewStyle = {
  paddingHorizontal: spacing.large,
  flex: 1,
}

const $addButton: ViewStyle = {
  position: "absolute",
  bottom: spacing.large,
  right: spacing.large,
}
