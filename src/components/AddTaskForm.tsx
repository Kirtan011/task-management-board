"use client"

import type React from "react"
import type { Task } from "@/src/types/task"

interface AddTaskFormProps {
  darkMode: boolean
  editingTask: Task
  onSubmit: (title: string, description: string) => void
  onCancel: () => void
}

export function AddTaskForm({ darkMode, editingTask, onSubmit, onCancel }: AddTaskFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    onSubmit(title, description)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className={`rounded-lg p-4 sm:p-6 max-w-md w-full ${darkMode ? "bg-gray-800" : "bg-white"}`}>
        <h2 className={`text-lg sm:text-xl font-bold mb-3 sm:mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
          {editingTask.id ? "Edit Task" : "Add Task"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 sm:mb-4">
            <label
              className={`block text-xs sm:text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
            >
              Title
            </label>
            <input
              type="text"
              name="title"
              defaultValue={editingTask.title}
              required
              className={`w-full px-3 py-2 text-sm sm:text-base rounded border ${
                darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"
              }`}
            />
          </div>
          <div className="mb-3 sm:mb-4">
            <label
              className={`block text-xs sm:text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
            >
              Description
            </label>
            <textarea
              name="description"
              defaultValue={editingTask.description}
              rows={3}
              className={`w-full px-3 py-2 text-sm sm:text-base rounded border ${
                darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"
              }`}
            />
          </div>
          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={onCancel}
              className={`px-3 sm:px-4 py-2 text-sm sm:text-base rounded ${
                darkMode ? "bg-gray-700 hover:bg-gray-600 text-white" : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-3 sm:px-4 py-2 text-sm sm:text-base rounded ${
                darkMode ? "bg-purple-600 hover:bg-purple-700" : "bg-blue-500 hover:bg-blue-600"
              } text-white`}
            >
              {editingTask.id ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
