import { getRequest } from '../utils/client'
import { JSONResponse } from '../utils/response'

export async function onRequestGet ({ request, env, data: { authToken } }) {
  const { searchParams } = new URL(request.url)

  const { body, status } = await getRequest('timetrackingboard', searchParams, authToken, env)

  return new JSONResponse(body, { status })
}
