import { v4 as uuidv4 } from 'uuid'
import { mockTasks } from '../data/mockTasks'

const MOCK_DELAY_MS = 600

let tasks = [...mockTasks]

function delay(value) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value), MOCK_DELAY_MS)
  })
}

/**
 * Simulates fetching tasks from an API.
 * Swap these implementations with axios when the backend is ready.
 */
export function getTasks() {
  return delay([...tasks])
}

export function createTask(title) {
  const task = {
    id: uuidv4(),
    title,
    completed: false,
    createdAt: new Date().toISOString(),
  }

  tasks = [task, ...tasks]
  return delay(task)
}

export function updateTask(id, updates) {
  const index = tasks.findIndex((task) => task.id === id)

  if (index === -1) {
    return Promise.reject(new Error('Task not found'))
  }

  tasks[index] = { ...tasks[index], ...updates }
  return delay(tasks[index])
}

export function deleteTask(id) {
  const index = tasks.findIndex((task) => task.id === id)

  if (index === -1) {
    return Promise.reject(new Error('Task not found'))
  }

  const [removed] = tasks.splice(index, 1)
  return delay(removed)
}
