import type { ZodIssue } from 'zod'
import type { Form } from '#ui/types'

export function handleErrorMessageI8n(message: string) {
  const nuxtApp = useNuxtApp()
  const t = nuxtApp.$i18n.t
  return message.match(/^i18n:/) ? t(message.slice(5)) : message
}

export function handleZodError<T>(err: unknown, formRef: Ref<Form<T> | undefined>) {
  if (
    err
    && typeof err === 'object'
    && 'data' in err
    && err.data
    && typeof err.data === 'object'
    && 'data' in err.data
    && typeof err.data.data === 'object'
    && err.data.data
    && 'issues' in err.data.data
    && Array.isArray(err.data.data.issues)
  ) {
    const issues = err.data.data.issues as ZodIssue[]
    formRef.value?.setErrors(issues.map(i => ({
      message: handleErrorMessageI8n(i.message),
      path: i.path.join('.')
    })))
    return true
  }
  return false
}
