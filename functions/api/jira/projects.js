import { getRequest } from '../../utils/jiraClient'
import { JSONResponse } from '../../utils/response'

export async function onRequestGet ({ env, data: { authToken } }) {
  const { body, status } = await getRequest('rest/api/3/project', null, authToken, env)

  return new JSONResponse(body, { status })
}
