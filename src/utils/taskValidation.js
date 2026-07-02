import { z } from 'zod'
import { TASK_TITLE_MAX_LENGTH, TASK_TITLE_MIN_LENGTH } from '../constants/task'

const taskTitleSchema = z
  .string()
  .trim()
  .min(TASK_TITLE_MIN_LENGTH, 'Title is required')
  .max(TASK_TITLE_MAX_LENGTH, `Title must be ${TASK_TITLE_MAX_LENGTH} characters or less`)

export function validateTaskTitle(title) {
  const result = taskTitleSchema.safeParse(title)

  if (!result.success) {
    return {
      success: false,
      error: result.error.issues[0]?.message ?? 'Invalid title',
    }
  }

  return {
    success: true,
    data: result.data,
  }
}
