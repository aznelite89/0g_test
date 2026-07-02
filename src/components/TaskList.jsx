import TaskItem from './TaskItem'
import './TaskList.css'

export default function TaskList({ tasks, emptyMessage = 'No tasks yet. Add one above.' }) {
  if (tasks.length === 0) {
    return <p className="task-list__empty">{emptyMessage}</p>
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  )
}
