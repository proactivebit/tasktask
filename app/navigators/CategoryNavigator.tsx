import { createStackNavigator, StackScreenProps } from "@react-navigation/stack"
import React from "react"
import { AddCategoryScreen } from "../screens/AddCategoryScreen"
import { CategoriesScreen } from "../screens/CategoriesScreen"

export type CategoryNavigatorParamList = {
  Categories: undefined
  AddCategory: undefined
}

export type CategoryScreenProps<T extends keyof CategoryNavigatorParamList> = StackScreenProps<
  CategoryNavigatorParamList,
  T
>

const Stack = createStackNavigator<CategoryNavigatorParamList>()
export const CategoryNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ cardStyle: { backgroundColor: "transparent" }, headerShown: false }}
    >
      <Stack.Screen name="Categories" component={CategoriesScreen} />
      <Stack.Screen name="AddCategory" component={AddCategoryScreen} />
    </Stack.Navigator>
  )
}
