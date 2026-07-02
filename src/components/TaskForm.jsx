import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { TASK_TITLE_MAX_LENGTH } from '../constants/task'
import { useTasks } from '../hooks/useTasks'
import { validateTaskTitle } from '../utils/taskValidation'
import './TaskForm.css'

export default function TaskForm() {
  const { addTask } = useTasks()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm({
    defaultValues: { title: '' },
  })

  const onSubmit = async ({ title }) => {
    const validation = validateTaskTitle(title)

    if (!validation.success) {
      setError('title', { type: 'manual', message: validation.error })
      return
    }

    try {
      await addTask(validation.data)
      toast.success('Task created successfully')
      reset()
    } catch {
      toast.error('Failed to create task')
    }
  }

  return (
    <form className="task-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="task-form__field">
        <label htmlFor="task-title">New task</label>
        <div className="task-form__controls">
          <input
            id="task-title"
            type="text"
            placeholder="What needs to be done?"
            maxLength={TASK_TITLE_MAX_LENGTH}
            aria-invalid={Boolean(errors.title)}
            aria-describedby={errors.title ? 'task-title-error' : undefined}
            {...register('title')}
          />
          <button type="submit" disabled={isSubmitting}>
            Add task
          </button>
        </div>
        {errors.title && (
          <p id="task-title-error" className="task-form__error" role="alert">
            {errors.title.message}
          </p>
        )}
      </div>
    </form>
  )
}
