import { getRequest } from '../../utils/jiraClient'
import { JSONResponse } from '../../utils/response'

export async function onRequestGet ({ request, env, data: { authToken } }) {
  const { searchParams } = new URL(request.url)

  const { body, status } = await getRequest('rest/api/3/search', searchParams, authToken, env)

  return new JSONResponse(body, { status })
}
