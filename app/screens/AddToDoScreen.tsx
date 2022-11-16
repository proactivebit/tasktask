import Icon from "@expo/vector-icons/FontAwesome5"
import { observer } from "mobx-react-lite"
import React, { FC, useState } from "react"
import { Keyboard, View, ViewStyle } from "react-native"
import {
  Button,
  ButtonCalendar,
  DatePicker,
  Header,
  Screen,
  TextFieldNoBorders,
} from "../components"
import { CategoryPicker } from "../components/CategoryPicker"
import { Loader } from "../components/Loader"
import { TaskSnapshotIn, useStores } from "../models"
import { Category } from "../models/Category"
import { ToDoScreenProps } from "../navigators/ToDoNavigator"
import { colors, spacing } from "../theme"

interface AddToScreenProps extends ToDoScreenProps<"AddToDo"> {}

export const AddToDoScreen: FC<AddToScreenProps> = observer(function AddToDoScreen(_props) {
  const { navigation } = _props
  const [date, setDate] = useState(new Date())
  const [task, setTask] = useState("")
  const [category, setCategory] = useState<Category>()
  const [loading, setLoading] = useState(false)
  const {
    taskStore,
    authenticationStore: { user },
  } = useStores()

  async function onAddTask() {
    if (!task || !date) {
      return
    }
    setLoading(true)
    const taskIn: TaskSnapshotIn = {
      task,
      date,
      user: user.uid,
    }
    category && (taskIn.category = category.id)
    await taskStore.addTask(taskIn)
    setLoading(false)
    navigation.goBack()
  }

  return (
    <Loader loading={loading}>
      <Screen
        style={$root}
        preset="scroll"
        safeAreaEdges={["bottom"]}
        contentContainerStyle={$root}
        statusBarStyle="light"
      >
        <Header
          rightIcon="x"
          onRightPress={() => navigation.goBack()}
          rightIconColor={colors.text}
        />
        <View style={$content}>
          <View style={$form}>
            <TextFieldNoBorders
              value={task}
              onChangeText={setTask}
              placeholderTx="addToDoScreen.input.placeholder"
              multiline={true}
            />
            <View style={$buttonsWrapper}>
              <DatePicker
                style={$datePicker}
                value={date}
                onChange={setDate}
                pressableCompoent={(value, toogle) => (
                  <ButtonCalendar
                    date={value}
                    onPress={() => {
                      Keyboard.dismiss()
                      toogle()
                    }}
                  />
                )}
              />
              <CategoryPicker
                style={$categoryPicker}
                value={category}
                onCategorySelected={setCategory}
              />
            </View>
          </View>
          <Button
            onPress={onAddTask}
            style={$button}
            preset="default"
            tx="addToDoScreen.button.add"
            RightAccessory={(props) => (
              <Icon {...props} name="chevron-up" size={20} color={colors.palette.neutral900} />
            )}
          />
        </View>
      </Screen>
    </Loader>
  )
})

const $root: ViewStyle = {
  flex: 1,
}

const $content: ViewStyle = {
  paddingHorizontal: spacing.large,
  paddingBottom: spacing.large,
  flex: 1,
  justifyContent: "space-between",
}

const $button: ViewStyle = {
  width: 200,
  alignSelf: "flex-end",
}

const $form: ViewStyle = {
  flex: 1,
  justifyContent: "center",
}

const $datePicker: ViewStyle = {
  // marginTop: spacing.extraLarge,
}

const $buttonsWrapper: ViewStyle = {
  marginTop: spacing.extraLarge,
  flexDirection: "row",
  alignItems: "center",
}

const $categoryPicker: ViewStyle = {
  marginLeft: spacing.extraLarge,
}
