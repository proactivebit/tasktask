import { TaskStoreModel } from "./TaskStore"

test("can be created", () => {
  const instance = TaskStoreModel.create({})

  expect(instance).toBeTruthy()
})
