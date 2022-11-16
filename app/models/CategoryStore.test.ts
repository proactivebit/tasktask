import { CategoryStoreModel } from "./CategoryStore"

test("can be created", () => {
  const instance = CategoryStoreModel.create({})

  expect(instance).toBeTruthy()
})
