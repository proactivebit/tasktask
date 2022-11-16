import { TaskModel } from "./Task"

test("can be created", () => {
  const instance = TaskModel.create({})

  expect(instance).toBeTruthy()
})
