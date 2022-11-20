import { observer } from "mobx-react-lite"
import * as React from "react"
import { useState } from "react"
import {
  Dimensions,
  Modal,
  StyleProp,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from "react-native"
import { useCategoryColor } from "../hooks/useCategoryColor"
import { useStores } from "../models"
import { Category } from "../models/Category"
import { colors, spacing } from "../theme"
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

  const hanleCategorySelected = (category: Category) => {
    onCategorySelected(category)
    setModalVisible(false)
  }

  const { color } = useCategoryColor(value)

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
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible)
        }}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={$centeredView}>
            <View style={$modalView}>
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
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  )
})

const $centeredView: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  marginTop: 22,
}

const $container: ViewStyle = {
  justifyContent: "center",
}

const $modalView: ViewStyle = {
  backgroundColor: colors.cardBackground,
  padding: spacing.extraLarge,
  width: MODAL_WIDTH,
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
