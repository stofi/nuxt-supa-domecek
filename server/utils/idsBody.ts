import type { H3Event } from 'h3'

export default async function getIdsBody(event: H3Event) {
  const { ids: idsBody } = await readBody(event)

  if (!Array.isArray(idsBody) || idsBody.length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid or empty array of collection IDs'
    })
  }

  const ids = idsBody.map(id => parseInt(id, 10))

  return ids
}
