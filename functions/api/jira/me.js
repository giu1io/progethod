import { getRequest } from '../../utils/jiraClient'
import { JSONResponse } from '../../utils/response'

export async function onRequestGet ({ env, data: { authToken } }) {
  const sessionResponse = await getRequest('rest/auth/latest/session', null, authToken, env)

  if (sessionResponse.status !== 200) {
    return new JSONResponse(sessionResponse.body, { status: sessionResponse.status })
  }

  const accountIdResponse = await getRequest('rest/api/3/user/bulk/migration', new URLSearchParams({ username: sessionResponse.body.name }), authToken, env)

  if (accountIdResponse.status !== 200) {
    return new JSONResponse(accountIdResponse.body, { status: accountIdResponse.status })
  }

  if (accountIdResponse.body.length === 0) {
    return new JSONResponse({
      errorMessages: [
        'Could not find user'
      ],
      errors: {}
    }, { status: 500 })
  }

  const { body, status } = await getRequest('rest/api/3/user', new URLSearchParams({ accountId: accountIdResponse.body[0].accountId }), authToken, env)

  return new JSONResponse(body, { status })
}
