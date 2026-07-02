import { useEffect, useMemo, useState } from 'react'
import TaskForm from '../components/TaskForm'
import SearchBar from '../components/SearchBar'
import TaskList from '../components/TaskList'
import { useTasks } from '../hooks/useTasks'
import { filterTasksByTitle } from '../utils/taskFilter'
import './TasksPage.css'

export default function TasksPage() {
  const { tasks, loading, error, fetchTasks } = useTasks()
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  const filteredTasks = useMemo(
    () => filterTasksByTitle(tasks, searchQuery),
    [tasks, searchQuery],
  )

  const emptyMessage =
    tasks.length === 0 ? 'No tasks yet. Add one above.' : 'No tasks match your search.'

  return (
    <main className="tasks-page">
      <header className="tasks-page__header">
        <h1>Tasks</h1>
        <p>Create, update, and track your tasks.</p>
      </header>

      <TaskForm />

      {!loading && !error && (
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
      )}

      {loading && <p className="tasks-page__status">Loading...</p>}
      {error && <p className="tasks-page__error">{error}</p>}
      {!loading && !error && (
        <TaskList tasks={filteredTasks} emptyMessage={emptyMessage} />
      )}
    </main>
  )
}
