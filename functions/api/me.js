import { getCorsHeaders } from '../utils/cors'

export async function onRequest ({ request, env }) {
  const authToken = request.headers.get('x-sf-sess-id')

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

  let status = 500
  let body = '{}'

  try {
    const response = await fetch(`https://${env.PROXY_API_URL}/authentication/userinfo`, requestOptions)
    body = await response.text()
    status = 200
  } catch (error) {
    console.error(error)
    status = 500
  }

  return new Response(body, {
    headers: {
      'Content-Type': 'application/json',
      ...getCorsHeaders(env)
    },
    status
  })
}
