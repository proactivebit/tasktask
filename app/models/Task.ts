import { flow, Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { taskService } from "../services/firebase/taskService"
import { CategoryModel } from "./Category"
import { User, UserModel } from "./User"

/**
 * Task model.
 */
export const TaskModel = types
  .model("Task")
  .props({
    id: types.identifier,
    task: "",
    date: new Date(),
    done: false,
    user: types.maybe(types.reference(types.late(() => UserModel))),
    category: types.maybeNull(
      types.reference(CategoryModel, {
        onInvalidated(ev) {
          ev.removeRef()
        },
      }),
    ),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    setTask(task: string) {
      self.task = task
    },
    setDate(date: Date) {
      self.date = date
    },
    setUser(user: User) {
      self.user = user
    },
    setStatus: flow(function* setStatus(status: boolean) {
      yield taskService.setTaskStatus(self.id, self.user.uid, status)
      self.done = status
    }),
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface Task extends Instance<typeof TaskModel> {}
export interface TaskSnapshotOut extends SnapshotOut<typeof TaskModel> {}
export interface TaskSnapshotIn extends SnapshotIn<typeof TaskModel> {}
export const createTaskDefaultModel = () => types.optional(TaskModel, {})
