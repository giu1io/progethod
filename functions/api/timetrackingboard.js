import { baseRequest } from '../utils/client'
import { JSONResponse } from '../utils/response'

export async function onRequest ({ request, env, data: { authToken } }) {
  const { searchParams } = new URL(request.url)

  const { body, status } = await baseRequest('timetrackingboard', searchParams, authToken, env)

  return new JSONResponse(body, { status })
}
