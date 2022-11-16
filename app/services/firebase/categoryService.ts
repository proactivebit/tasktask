import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query } from "firebase/firestore"
import { db } from "../../config/firebase"
import { CategorySnapshotIn } from "../../models/Category"

export const DEFAULT_CATEGORY_REF = "DEFAULT_CATEGORY_REF"

export class CategoryService {
  async addCategory(category: CategorySnapshotIn, userId: string) {
    const docRef = await addDoc(collection(db, "users", userId, "categories"), {
      ...category,
    })

    return docRef.id
  }

  async getCategories(userId: string) {
    const categories: CategorySnapshotIn[] = []
    const categoriesRef = collection(db, "users", userId, "categories")
    const q = query(categoriesRef, orderBy("createdAt", "desc"))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      categories.push({
        ...doc.data(),
        id: doc.id,
        createdAt: doc.data().createdAt.toDate(),
      } as CategorySnapshotIn)
    })
    return categories
  }

  async removeCategory(categoryId: string, userId: string) {
    await deleteDoc(doc(db, "users", userId, "categories", categoryId))
  }
}

export const categoryService = new CategoryService()
