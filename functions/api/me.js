import { baseRequest } from '../utils/client'
import { JSONResponse } from '../utils/response'

export async function onRequest ({ env, data: { authToken } }) {
  const { body, status } = await baseRequest('authentication/userinfo', null, authToken, env)

  return new JSONResponse(body, { status })
}
