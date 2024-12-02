import type { H3Event } from 'h3'

export default function getIdParam(event: H3Event) {
  const idParam = event.context.params?.id

  if (!idParam) {
    throw createError({
      statusCode: 400,
      statusMessage: 'ID is required'
    })
  }
  const id = parseInt(idParam, 10)

  if (isNaN(id)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid ID'
    })
  }
  return id
}
