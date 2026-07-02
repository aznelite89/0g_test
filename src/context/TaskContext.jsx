import { createContext, useCallback, useMemo, useState } from 'react'
import * as taskService from '../services/taskService'

export const TaskContext = createContext(null)

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchTasks = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const data = await taskService.getTasks()
      setTasks(data)
    } catch (err) {
      setError(err?.message ?? 'Failed to load tasks')
      setTasks([])
    } finally {
      setLoading(false)
    }
  }, [])

  const addTask = useCallback(async (title) => {
    const newTask = await taskService.createTask(title)
    setTasks((current) => [newTask, ...current])
    return newTask
  }, [])

  const updateTask = useCallback(async (id, updates) => {
    const updatedTask = await taskService.updateTask(id, updates)
    setTasks((current) =>
      current.map((task) => (task.id === id ? updatedTask : task)),
    )
    return updatedTask
  }, [])

  const deleteTask = useCallback(async (id) => {
    await taskService.deleteTask(id)
    setTasks((current) => current.filter((task) => task.id !== id))
  }, [])

  const value = useMemo(
    () => ({
      tasks,
      loading,
      error,
      fetchTasks,
      addTask,
      updateTask,
      deleteTask,
    }),
    [tasks, loading, error, fetchTasks, addTask, updateTask, deleteTask],
  )

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>
}
