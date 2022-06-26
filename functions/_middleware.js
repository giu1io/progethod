import { getCorsHeaders } from './utils/cors'
import { JSONResponse } from './utils/response'

function isApi (request) {
  return new URL(request.url).pathname.match(/^\/api/)
}

function addCorsHeaders (response, env, request) {
  if (!isApi(request)) {
    return response
  }

  const cors = getCorsHeaders(env)

  Object.keys(cors).forEach((k) => {
    response.headers.set(k, cors[k])
  })

  return response
}

const errorHandler = async ({ next, env, request }) => {
  try {
    return await next()
  } catch (err) {
    return addCorsHeaders(new JSONResponse({
      code: 500,
      status: 'Error',
      message: err.message
    }, { status: 500, headers: getCorsHeaders(env) }), env, request)
  }
}

const corsHeaders = async ({ next, env, request }) => {
  const response = await next()

  addCorsHeaders(response, env, request)

  return response
}

const auth = ({ next, request, env, data }) => {
  data.authToken = request.headers.get('x-sf-sess-id') || request.headers.get('authorization')

  // require auth token only for /api
  if (data.authToken || !isApi(request)) {
    return next()
  }

  return addCorsHeaders(new JSONResponse({
    code: 401,
    status: 'Unauthorized',
    message: 'Missing Auth Token'
  }, { status: 401, headers: getCorsHeaders(env) }), env, request)
}

const options = ({ next, request, env }) => {
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: getCorsHeaders(env)
    })
  }

  return next()
}

export const onRequest = [options, auth, errorHandler, corsHeaders]
