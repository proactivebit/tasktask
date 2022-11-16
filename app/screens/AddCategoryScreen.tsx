import Icon from "@expo/vector-icons/FontAwesome5"
import { observer } from "mobx-react-lite"
import React, { FC, useState } from "react"
import { View, ViewStyle } from "react-native"
import { Button, Header, Screen, TextFieldNoBorders } from "../components"
import { ColorPicker } from "../components/ColorPicker"
import { Loader } from "../components/Loader"
import { useStores } from "../models"
import { CategoryScreenProps } from "../navigators/CategoryNavigator"
import { colors, spacing } from "../theme"

interface AddCategoryScreenProps extends CategoryScreenProps<"AddCategory"> {}

export const AddCategoryScreen: FC<AddCategoryScreenProps> = observer(function AddCategoryScreen(
  props,
) {
  const { navigation } = props
  const [categoryName, setCategoryName] = useState("")
  const [color, setColor] = useState("")
  const [loading, setLoading] = useState(false)
  const {
    categoryStore,
    authenticationStore: { user },
  } = useStores()

  const onAddCategory = async () => {
    if (!categoryName || !color) {
      return
    }
    setLoading(true)
    await categoryStore.addCategory(
      {
        name: categoryName,
        color,
        createdAt: new Date(),
      },
      user.uid,
    )
    setLoading(false)
    navigation.goBack()
  }

  return (
    <Loader loading={loading}>
      <Screen
        style={$root}
        preset="scroll"
        safeAreaEdges={["bottom"]}
        contentContainerStyle={{ flex: 1 }}
      >
        <Header
          rightIcon="x"
          onRightPress={() => navigation.goBack()}
          rightIconColor={colors.text}
        />
        <View style={$content}>
          <TextFieldNoBorders
            value={categoryName}
            onChangeText={setCategoryName}
            placeholderTx="addCategoryScreen.input.placeholder"
            multiline={false}
          />
          <ColorPicker selectedColor={color} onSelect={setColor} />
        </View>
        <Button
          onPress={onAddCategory}
          style={$button}
          preset="default"
          tx="addCategoryScreen.button.add"
          RightAccessory={(props) => (
            <Icon {...props} name="chevron-up" size={20} color={colors.palette.neutral900} />
          )}
        />
      </Screen>
    </Loader>
  )
})

const $root: ViewStyle = {
  flex: 1,
  paddingHorizontal: spacing.large,
  paddingBottom: spacing.large,
}

const $button: ViewStyle = {
  width: 200,
  alignSelf: "flex-end",
}

const $content: ViewStyle = {
  flex: 1,
  justifyContent: "center",
}
