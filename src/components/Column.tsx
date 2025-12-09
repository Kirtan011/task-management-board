"use client"

import type React from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TaskCard } from "./TaskCard"
import type { Task } from "@/src/types/task"

interface ColumnProps {
  status: "todo" | "in-progress" | "done"
  title: string
  tasks: Task[]
  darkMode: boolean
  draggedTaskId: string | null
  onDragOver: (e: React.DragEvent) => void
  onDrop: (e: React.DragEvent) => void
  onAddTask: () => void
  onEditTask: (task: Task) => void
  onDeleteTask: (id: string) => void
  onDragStart: (taskId: string) => void
}

export function Column({
  status,
  title,
  tasks,
  darkMode,
  draggedTaskId,
  onDragOver,
  onDrop,
  onAddTask,
  onEditTask,
  onDeleteTask,
  onDragStart,
}: ColumnProps) {
  return (
    <div
      className={`w-full rounded-lg p-3 sm:p-4 ${darkMode ? "bg-gray-800" : "bg-white"} ${
        draggedTaskId ? (darkMode ? "ring-2 ring-purple-500" : "ring-2 ring-blue-500") : ""
      }`}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <h2 className={`font-semibold text-base sm:text-lg ${darkMode ? "text-white" : "text-gray-900"}`}>
          {title}
          <span className={`ml-2 text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{tasks.length}</span>
        </h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={onAddTask}
          className={`h-8 w-8 flex-shrink-0 ${darkMode ? "hover:bg-gray-700" : ""}`}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-2">
        {tasks.length === 0 ? (
          <p className={`text-xs sm:text-sm text-center py-6 sm:py-8 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
            No tasks yet
          </p>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              darkMode={darkMode}
              isDragging={draggedTaskId === task.id}
              onDragStart={(e) => {
                e.dataTransfer.effectAllowed = "move"
                onDragStart(task.id)
              }}
              onEdit={() => onEditTask(task)}
              onDelete={() => onDeleteTask(task.id)}
            />
          ))
        )}
      </div>
    </div>
  )
}
