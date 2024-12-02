export default function (error: unknown) {
  if (error && typeof error === 'object' && 'statusCode' in error) {
    return error // Return existing custom error
  }

  return createError({
    statusCode: 500,
    statusMessage: 'Internal Server Error'
  })
}
