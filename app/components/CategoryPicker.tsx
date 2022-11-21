import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { useState } from "react"
import { Dimensions, StyleProp, View, ViewStyle } from "react-native"
import { useCategoryColor } from "../hooks/useCategoryColor"
import { useStores } from "../models"
import { Category } from "../models/Category"
import { colors, spacing } from "../theme"
import { ModalWrapper } from "./ModalWrapper"
import { Text } from "./Text"
import { Toggle } from "./Toggle"

const { width: SCREEN_WIDTH } = Dimensions.get("screen")
const MODAL_WIDTH = SCREEN_WIDTH - spacing.extraLarge * 2

export interface CategoryPickerProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  /**
   * The value of the field
   */
  value?: Category
  /**
   * Callback on category select
   */
  onCategorySelected: (value: Category) => void
}

/**
 * Render category list with option to select
 */
export const CategoryPicker = observer(function CategoryPicker(props: CategoryPickerProps) {
  const { style, onCategorySelected, value } = props
  const $styles = [$container, style]
  const {
    categoryStore: { categories },
  } = useStores()
  const [modalVisible, setModalVisible] = useState(false)
  const navigation = useNavigation<any>()

  const hanleCategorySelected = (category: Category) => {
    onCategorySelected(category)
    setModalVisible(false)
  }

  const { color } = useCategoryColor(value)

  const navigateToCategories = () => {
    setModalVisible(false)
    navigation.navigate("Category", { screen: "Categories" })
  }

  return (
    <View style={$styles}>
      <Toggle
        containerStyle={$categoryItem}
        variant="radio"
        onPress={() => setModalVisible(true)}
        inputOuterStyle={{
          width: 30,
          height: 30,
          borderRadius: 90,
        }}
        inputDetailStyle={{
          width: 20,
          height: 20,
          borderRadius: 90,
          backgroundColor: color,
        }}
        value={true}
      />
      <ModalWrapper style={$modalView} visible={modalVisible} setModalVisible={setModalVisible}>
        <View>
          {categories.map((category) => (
            <Toggle
              key={category.id}
              containerStyle={$categoryItem}
              variant="radio"
              label={category.name}
              onPress={() => hanleCategorySelected(category)}
              value={category.id === value?.id}
              inputDetailStyle={{
                width: 20,
                height: 20,
                borderRadius: 90,
                backgroundColor: color,
              }}
              inputOuterStyle={[$toggleOuter, { borderColor: category.color }] as ViewStyle}
            />
          ))}
          {categories.length === 0 && (
            <Text style={{ textAlign: "center" }}>
              <Text tx="categoryPickerComponent.noCategoryInfo"></Text>
              <Text
                tx="categoryPickerComponent.categoryLink"
                style={{ textDecorationLine: "underline" }}
                onPress={navigateToCategories}
              />
            </Text>
          )}
        </View>
      </ModalWrapper>
    </View>
  )
})

const $container: ViewStyle = {
  justifyContent: "center",
}

const $modalView: ViewStyle = {
  backgroundColor: colors.cardBackground,
}

const $categoryItem: ViewStyle = {
  marginVertical: spacing.small,
}

const $toggleOuter: ViewStyle = {
  borderRadius: 90,
  backgroundColor: colors.cardBackground,
  width: 30,
  height: 30,
}
