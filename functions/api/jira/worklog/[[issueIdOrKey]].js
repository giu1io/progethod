import { getRequest } from '../../../utils/jiraClient'
import { JSONResponse } from '../../../utils/response'

export async function onRequestGet ({ env, params, data: { authToken } }) {
  const { body, status } = await getRequest(`rest/api/3/issue/${params.issueIdOrKey}/worklog`, null, authToken, env)

  return new JSONResponse(body, { status })
}
