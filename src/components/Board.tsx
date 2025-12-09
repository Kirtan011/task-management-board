"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Column } from "./Column"
import { AddTaskForm } from "./AddTaskForm"
import type { Task } from "@/src/types/task"
import { loadTasks, saveTasks, loadTheme, saveTheme } from "@/src/lib/storage"

export function Board() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [darkMode, setDarkMode] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null)

  // Load tasks and theme on mount
  useEffect(() => {
    setTasks(loadTasks())
    setDarkMode(loadTheme())
  }, [])

  // Save tasks whenever they change
  useEffect(() => {
    saveTasks(tasks)
  }, [tasks])

  // Apply dark mode to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
    saveTheme(darkMode)
  }, [darkMode])

  const addTask = (title: string, description: string, status: Task["status"]) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description,
      status,
    }
    setTasks([...tasks, newTask])
  }

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, ...updates } : task)))
  }

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
  }

  const handleDrop = (status: Task["status"]) => (e: React.DragEvent) => {
    e.preventDefault()
    if (draggedTaskId) {
      updateTask(draggedTaskId, { status })
      setDraggedTaskId(null)
    }
  }

  const openAddModal = (status: Task["status"]) => {
    setEditingTask({ id: "", title: "", description: "", status })
    setShowModal(true)
  }

  const openEditModal = (task: Task) => {
    setEditingTask(task)
    setShowModal(true)
  }

  const handleFormSubmit = (title: string, description: string) => {
    if (editingTask) {
      if (editingTask.id) {
        updateTask(editingTask.id, { title, description })
      } else {
        addTask(title, description, editingTask.status)
      }
    }
    setShowModal(false)
  }

  const columns = [
    { status: "todo" as const, title: "To Do" },
    { status: "in-progress" as const, title: "In Progress" },
    { status: "done" as const, title: "Done" },
  ]

  return (
    <div className={`min-h-screen p-3 sm:p-6 md:p-8 ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-4 sm:mb-6 md:mb-8 flex items-center justify-between gap-3">
          <div>
            <h1
              className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-1 ${darkMode ? "text-white" : "text-gray-900"}`}
            >
              Task Board
            </h1>
            <p className={`text-sm sm:text-base ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Drag and drop tasks between columns
            </p>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setDarkMode(!darkMode)}
            className={`flex-shrink-0 ${darkMode ? "border-gray-700" : ""}`}
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>

        <div className="flex flex-col md:grid md:grid-cols-3 gap-3 sm:gap-4 md:items-start">
          {columns.map(({ status, title }) => (
            <Column
              key={status}
              status={status}
              title={title}
              tasks={tasks.filter((task) => task.status === status)}
              darkMode={darkMode}
              draggedTaskId={draggedTaskId}
              onDragOver={handleDragOver}
              onDrop={handleDrop(status)}
              onAddTask={() => openAddModal(status)}
              onEditTask={openEditModal}
              onDeleteTask={deleteTask}
              onDragStart={setDraggedTaskId}
            />
          ))}
        </div>
      </div>

      {showModal && editingTask && (
        <AddTaskForm
          darkMode={darkMode}
          editingTask={editingTask}
          onSubmit={handleFormSubmit}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  )
}
