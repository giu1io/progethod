export async function baseRequest (method, endpoint, queryParams, requestBody, authToken, env) {
  const requestHeaders = new Headers()
  requestHeaders.append('accept', 'application/json')
  requestHeaders.append('accept-language', 'en-GB,en-US;q=0.9,en;q=0.8,it;q=0.7')
  requestHeaders.append('authorization', authToken)

  const requestOptions = {
    method,
    headers: requestHeaders,
    redirect: 'follow'
  }

  if (requestBody) {
    requestHeaders.append('Content-Type', 'application/json')
    requestOptions.body = JSON.stringify(requestBody)
  }

  const requestUrl = new URL(`https://${env.PROXY_JIRA_API_URL}/${endpoint}`)

  requestUrl.search = queryParams?.toString() || ''

  let status = 500
  let body = {}

  try {
    const response = await fetch(requestUrl, requestOptions)
    body = await response.json()
    status = response.status
  } catch (error) {
    console.error(error)
    status = 500
    body = {
      errorMessages: [
        error.message
      ],
      errors: {}
    }
  }

  return {
    body,
    status
  }
}

export function getRequest (endpoint, queryParams, authToken, env) {
  return baseRequest('GET', endpoint, queryParams, null, authToken, env)
}

export function postRequest (endpoint, body, authToken, env) {
  return baseRequest('POST', endpoint, null, body, authToken, env)
}
