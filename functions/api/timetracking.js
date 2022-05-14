import { postRequest } from '../utils/client'
import { JSONResponse } from '../utils/response'

export async function onRequestPost ({ request, env, data: { authToken } }) {
  const { body, status } = await postRequest('timetracking/', await request.json(), authToken, env)
  return new JSONResponse(body, { status })
}
