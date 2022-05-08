export async function baseRequest (endpoint, queryParams, authToken, env) {
  const myHeaders = new Headers()
  myHeaders.append('authority', env.PROXY_API_URL)
  myHeaders.append('accept', 'application/json, text/javascript, */*; q=0.01')
  myHeaders.append('accept-language', 'en-GB,en-US;q=0.9,en;q=0.8,it;q=0.7')
  myHeaders.append('cookie', `SFSESSID=${authToken};`)
  myHeaders.append('dnt', '1')
  myHeaders.append('origin', `https://${env.PROXY_ORIGIN_URL}`)
  myHeaders.append('referer', `https://${env.PROXY_ORIGIN_URL}/`)
  myHeaders.append('user-agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36')

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  }

  const requestUrl = new URL(`https://${env.PROXY_API_URL}/${endpoint}`)

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
      code: status,
      status: 'Error',
      message: error.message
    }
  }

  return {
    body,
    status
  }
}
