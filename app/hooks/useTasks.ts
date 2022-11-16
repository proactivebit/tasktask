import { useEffect } from "react"
import { useStores } from "../models"

export const useTasks = (date: Date) => {
  const {
    taskStore,
    authenticationStore: { user },
  } = useStores()

  useEffect(() => {
    taskStore.loadTasks(user.uid, date)
  }, [date])
}
