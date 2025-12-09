"use client"

import type React from "react"
import type { Task } from "@/src/types/task"

interface TaskCardProps {
  task: Task
  darkMode: boolean
  isDragging: boolean
  onDragStart: (e: React.DragEvent) => void
  onEdit: () => void
  onDelete: () => void
}

export function TaskCard({ task, darkMode, isDragging, onDragStart, onEdit, onDelete }: TaskCardProps) {
  return (
    <div
      draggable
      onDragStart={onDragStart}
      className={`p-2.5 sm:p-3 rounded-md cursor-move transition-all ${
        darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-50 hover:bg-gray-100"
      } ${isDragging ? "opacity-50 scale-95" : ""} border-2 border-transparent hover:border-current ${
        darkMode ? "hover:border-purple-500" : "hover:border-blue-500"
      }`}
    >
      <h3 className={`font-medium text-sm sm:text-base mb-1 break-words ${darkMode ? "text-white" : "text-gray-900"}`}>
        {task.title}
      </h3>
      {task.description && (
        <p
          className={`text-xs sm:text-sm mb-2 break-words overflow-wrap-anywhere ${darkMode ? "text-gray-400" : "text-gray-600"}`}
        >
          {task.description}
        </p>
      )}
      <div className="flex gap-1.5 sm:gap-2 flex-wrap">
        <button
          onClick={onEdit}
          className={`text-xs px-2.5 py-1.5 sm:px-2 sm:py-1 rounded ${
            darkMode ? "bg-gray-600 hover:bg-gray-500 text-white" : "bg-gray-200 hover:bg-gray-300 text-gray-700"
          }`}
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="text-xs px-2.5 py-1.5 sm:px-2 sm:py-1 rounded bg-red-500 hover:bg-red-600 text-white"
        >
          Delete
        </button>
      </div>
    </div>
  )
}
