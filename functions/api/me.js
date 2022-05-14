import { getRequest } from '../utils/client'
import { JSONResponse } from '../utils/response'

export async function onRequestGet ({ env, data: { authToken } }) {
  const { body, status } = await getRequest('authentication/userinfo', null, authToken, env)

  return new JSONResponse(body, { status })
}
