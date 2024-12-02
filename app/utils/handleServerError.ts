// import type { ZodIssue } from 'zod'
import type { Form } from '#ui/types'

export function handleServerError<T>(err: unknown, formRef: Ref<Form<T> | undefined>, path: string) {
  if (err
    && typeof err === 'object'
    && 'data' in err
    && err.data
    && typeof err.data === 'object'
    && 'message' in err.data
    && typeof err.data.message === 'string'
  ) {
    formRef.value?.setErrors([{
      message: err.data.message,
      path
    }])
    return true
  }
  return false
}
