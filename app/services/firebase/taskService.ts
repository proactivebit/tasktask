import { endOfDay, startOfDay } from "date-fns"
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore"
import { db } from "../../config/firebase"
import { Task, TaskSnapshotIn } from "../../models"

export class TaskService {
  async addTask(task: TaskSnapshotIn) {
    const docRef = await addDoc(collection(db, "users", task.user.toString(), "tasks"), {
      ...task,
    })
    return docRef.id
  }

  async removeTask(task: Task) {
    await deleteDoc(doc(db, "users", task.user.uid, "tasks", task.id))
  }

  async getTasks(userId: string, date: Date): Promise<TaskSnapshotIn[]> {
    const tasks: TaskSnapshotIn[] = []
    const tasksRef = collection(db, "users", userId, "tasks")
    const q = query(
      tasksRef,
      where("date", ">=", startOfDay(date)),
      where("date", "<=", endOfDay(date)),
      orderBy("date", "desc"),
    )
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      tasks.push({
        ...doc.data(),
        date: doc.data().date.toDate(),
        id: doc.id,
      } as TaskSnapshotIn)
    })
    return tasks
  }

  async setTaskStatus(tasksId: string, userId: string, status: boolean): Promise<void> {
    const taskRef = doc(db, "users", userId, "tasks", tasksId)
    await updateDoc(taskRef, {
      done: status,
    })
  }
}

export const taskService = new TaskService()
