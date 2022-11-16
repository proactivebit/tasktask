import { endOfDay, startOfDay } from "date-fns"
import { destroy, flow, Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { taskService } from "../services/firebase/taskService"
import { colors } from "../theme"
import { Category } from "./Category"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { TaskModel, TaskSnapshotIn } from "./Task"

export interface CategorySummary extends Category {
  taskCount: number
  tasksDone: number
}

/**
 * Task collections.
 */
export const TaskStoreModel = types
  .model("TaskStore")
  .props({
    tasks: types.array(TaskModel),
  })
  .views((self) => ({
    filterTasksByDate(date: Date) {
      const tasks = self.tasks.filter(
        (todo) => todo.date >= startOfDay(date) && todo.date <= endOfDay(date),
      )
      return tasks
    },
    get categories() {
      const categoriesResult = self.tasks.reduce(
        (previousValue, currentValue) => {
          if (!currentValue.category) {
            if (previousValue.has("NONE")) {
              const value = previousValue.get("NONE")
              value.taskCount++, currentValue.done && value.tasksDone++
            }
            return previousValue
          }
          if (previousValue.has(currentValue.category.id)) {
            const value = previousValue.get(currentValue.category.id)
            value.taskCount++, currentValue.done && value.tasksDone++
          } else {
            previousValue.set(currentValue.category.id, {
              ...currentValue.category,
              taskCount: 1,
              tasksDone: currentValue.done ? 1 : 0,
            })
          }
          return previousValue
        },
        new Map<string, CategorySummary>([
          [
            "NONE",
            {
              id: "NONE",
              color: colors.palette.neutral900,
              name: "None",
              createdAt: new Date(),
              taskCount: 0,
              tasksDone: 0,
            },
          ],
        ]),
      )
      console.log(categoriesResult)
      return Array.from(categoriesResult.values()).sort(
        (a, b) => a.createdAt.getTime() - b.createdAt.getTime(),
      )
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(withSetPropAction)
  .actions((self) => ({
    async loadTasks(userId: string, date: Date) {
      const tasks = await taskService.getTasks(userId, date)
      console.log(tasks)
      self.setProp("tasks", tasks)
    },
  }))
  .actions((self) => ({
    addTask: flow(function* addTask(task: TaskSnapshotIn) {
      const taskId = yield taskService.addTask(task)
      self.tasks.unshift({ id: taskId, ...task })
    }),
    removeTask: flow(function* removeTask(taskId: string) {
      const task = self.tasks.find((ele) => ele.id === taskId)
      yield taskService.removeTask(task)
      destroy(task)
    }),
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface TaskStore extends Instance<typeof TaskStoreModel> {}
export interface TaskStoreSnapshotOut extends SnapshotOut<typeof TaskStoreModel> {}
export interface TaskStoreSnapshotIn extends SnapshotIn<typeof TaskStoreModel> {}
export const createTaskStoreDefaultModel = () => types.optional(TaskStoreModel, {})
