import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import clsx from 'clsx'
import { toast } from 'react-toastify'
import { TASK_TITLE_MAX_LENGTH } from '../constants/task'
import { useTasks } from '../hooks/useTasks'
import { validateTaskTitle } from '../utils/taskValidation'
import './TaskItem.css'

export default function TaskItem({ task }) {
  const { updateTask, deleteTask } = useTasks()
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(task.title)
  const [editError, setEditError] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  const createdDate = format(new Date(task.createdAt), 'MMM d, yyyy')

  useEffect(() => {
    if (!isEditing) {
      setEditTitle(task.title)
      setEditError('')
    }
  }, [task.title, isEditing])

  const handleToggle = async () => {
    try {
      await updateTask(task.id, { completed: !task.completed })
      toast.success('Task updated successfully')
    } catch {
      toast.error('Failed to update task')
    }
  }

  const startEditing = () => {
    setEditTitle(task.title)
    setEditError('')
    setIsEditing(true)
  }

  const cancelEditing = () => {
    setEditTitle(task.title)
    setEditError('')
    setIsEditing(false)
  }

  const saveTitle = async () => {
    const validation = validateTaskTitle(editTitle)

    if (!validation.success) {
      setEditError(validation.error)
      return
    }

    if (validation.data === task.title) {
      setIsEditing(false)
      return
    }

    setIsSaving(true)

    try {
      await updateTask(task.id, { title: validation.data })
      toast.success('Task updated successfully')
      setIsEditing(false)
    } catch {
      toast.error('Failed to update task')
    } finally {
      setIsSaving(false)
    }
  }

  const handleEditKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      saveTitle()
    }

    if (event.key === 'Escape') {
      event.preventDefault()
      cancelEditing()
    }
  }

  const handleDelete = async () => {
    if (!window.confirm(`Delete "${task.title}"?`)) {
      return
    }

    try {
      await deleteTask(task.id)
      toast.success('Task deleted successfully')
    } catch {
      toast.error('Failed to delete task')
    }
  }

  return (
    <li className={clsx('task-item', task.completed && 'task-item--completed')}>
      <div className="task-item__main">
        <label className="task-item__label">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={handleToggle}
            aria-label={`Mark "${task.title}" as ${task.completed ? 'incomplete' : 'complete'}`}
          />
          {isEditing ? (
            <div className="task-item__edit">
              <input
                type="text"
                className="task-item__edit-input"
                value={editTitle}
                maxLength={TASK_TITLE_MAX_LENGTH}
                onChange={(event) => setEditTitle(event.target.value)}
                onKeyDown={handleEditKeyDown}
                aria-invalid={Boolean(editError)}
                aria-describedby={editError ? `edit-error-${task.id}` : undefined}
                autoFocus
              />
              <div className="task-item__edit-actions">
                <button type="button" onClick={saveTitle} disabled={isSaving}>
                  Save
                </button>
                <button type="button" className="task-item__cancel" onClick={cancelEditing}>
                  Cancel
                </button>
              </div>
              {editError && (
                <p id={`edit-error-${task.id}`} className="task-item__error" role="alert">
                  {editError}
                </p>
              )}
            </div>
          ) : (
            <span className="task-item__title">{task.title}</span>
          )}
        </label>
        {!isEditing && (
          <div className="task-item__actions">
            <button type="button" className="task-item__edit-btn" onClick={startEditing}>
              Edit
            </button>
            <button
              type="button"
              className="task-item__delete-btn"
              onClick={handleDelete}
              aria-label={`Delete "${task.title}"`}
            >
              Delete
            </button>
          </div>
        )}
      </div>
      <time className="task-item__date" dateTime={task.createdAt}>
        {createdDate}
      </time>
    </li>
  )
}
