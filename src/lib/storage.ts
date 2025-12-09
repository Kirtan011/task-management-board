import type { Task } from "@/src/types/task"

export const loadTasks = (): Task[] => {
  if (typeof window === "undefined") return []
  const saved = localStorage.getItem("tasks")
  return saved ? JSON.parse(saved) : []
}

export const saveTasks = (tasks: Task[]): void => {
  if (typeof window === "undefined") return
  localStorage.setItem("tasks", JSON.stringify(tasks))
}

export const loadTheme = (): boolean => {
  if (typeof window === "undefined") return false
  const savedTheme = localStorage.getItem("darkMode")
  return savedTheme === "true"
}

export const saveTheme = (darkMode: boolean): void => {
  if (typeof window === "undefined") return
  localStorage.setItem("darkMode", darkMode.toString())
}
