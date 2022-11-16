import { destroy, flow, Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { categoryService } from "../services/firebase/categoryService"
import { CategoryModel, CategorySnapshotIn } from "./Category"
import { withSetPropAction } from "./helpers/withSetPropAction"

/**
 * Storage for categories
 */
export const CategoryStoreModel = types
  .model("CategoryStore")
  .props({
    categories: types.array(CategoryModel),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(withSetPropAction)
  .actions((self) => ({
    async loadCategoris(userId: string) {
      const categories = await categoryService.getCategories(userId)
      self.setProp("categories", categories)
    },
  }))
  .actions((self) => ({
    addCategory: flow(function* addCategory(category: CategorySnapshotIn, userId: string) {
      const categoryId = yield categoryService.addCategory(category, userId)
      self.categories.unshift({ id: categoryId, ...category })
    }),
    removeCategory: flow(function* removeCategory(categoryId: string, userId: string) {
      const category = self.categories.find((ele) => ele.id === categoryId)
      yield categoryService.removeCategory(categoryId, userId)
      destroy(category)
    }),
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface CategoryStore extends Instance<typeof CategoryStoreModel> {}
export interface CategoryStoreSnapshotOut extends SnapshotOut<typeof CategoryStoreModel> {}
export interface CategoryStoreSnapshotIn extends SnapshotIn<typeof CategoryStoreModel> {}
export const createCategoryStoreDefaultModel = () => types.optional(CategoryStoreModel, {})
