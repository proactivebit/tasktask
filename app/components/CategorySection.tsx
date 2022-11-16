import { observer } from "mobx-react-lite"
import * as React from "react"
import { ScrollView, StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { useStores } from "../models"
import { CategoryProgressCard } from "./CategoryProgressCard"
import { SectionHeader } from "./SectionHeader"

export interface CategorySectionProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Section with todo categories
 */
export const CategorySection = observer(function CategorySection(props: CategorySectionProps) {
  const { style } = props
  const $styles = [$container, style]
  const {
    taskStore: { categories },
  } = useStores()

  return (
    <View style={$styles}>
      <View style={$textContainer}>
        <SectionHeader tx="categorySectionComponent.name"></SectionHeader>
      </View>
      <ScrollView style={$categoryList} horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((category) => (
          <CategoryProgressCard key={category.id} style={$category} categorySummary={category} />
        ))}
      </ScrollView>
    </View>
  )
})

const $container: ViewStyle = {
  justifyContent: "center",
}

const $categoryList: ViewStyle = {
  flexDirection: "row",
}

const $category: ViewStyle = {}

const $textContainer: TextStyle = {}
