import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const CategoryModel = types
  .model("Category")
  .props({
    id: types.identifier,
    name: "",
    color: "",
    createdAt: new Date(),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface Category extends Instance<typeof CategoryModel> {}
export interface CategorySnapshotOut extends SnapshotOut<typeof CategoryModel> {}
export interface CategorySnapshotIn extends SnapshotIn<typeof CategoryModel> {}
export const createCategoryDefaultModel = () => types.optional(CategoryModel, {})
