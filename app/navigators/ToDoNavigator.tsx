import { NavigatorScreenParams } from "@react-navigation/native"
import { createStackNavigator, StackScreenProps, TransitionPresets } from "@react-navigation/stack"
import React from "react"
import { HomeScreen } from "../screens"
import { AddToDoScreen } from "../screens/AddToDoScreen"
import { CategoryNavigator, CategoryNavigatorParamList } from "./CategoryNavigator"

export type ToDoNavigatorParamList = {
  Home: undefined
  AddToDo: undefined
  Category: NavigatorScreenParams<CategoryNavigatorParamList>
}

export type ToDoScreenProps<T extends keyof ToDoNavigatorParamList> = StackScreenProps<
  ToDoNavigatorParamList,
  T
>

const Stack = createStackNavigator<ToDoNavigatorParamList>()
export const ToDoNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: { backgroundColor: "transparent" },
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="AddToDo" component={AddToDoScreen} />
      <Stack.Screen name="Category" component={CategoryNavigator} />
    </Stack.Navigator>
  )
}
