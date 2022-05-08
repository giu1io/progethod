import { getCorsHeaders } from './utils/cors'
import { JSONResponse } from './utils/response'

function addCorsHeaders (response, env) {
  const cors = getCorsHeaders(env)

  Object.keys(cors).forEach((k) => {
    response.headers.set(k, cors[k])
  })

  return response
}

const errorHandler = async ({ next, env }) => {
  try {
    return await next()
  } catch (err) {
    return addCorsHeaders(new JSONResponse({
      code: 500,
      status: 'Error',
      message: err.message
    }, { status: 500 }), env)
  }
}

const corsHeaders = async ({ next, env }) => {
  const response = await next()

  addCorsHeaders(response, env)

  return response
}

const auth = ({ next, request, env, data }) => {
  data.authToken = request.headers.get('x-sf-sess-id')
  if (data.authToken) {
    return next()
  }

  return addCorsHeaders(new JSONResponse({
    code: 401,
    status: 'Unauthorized',
    message: 'Missing Auth Token'
  }), env)
}

export const onRequest = [auth, errorHandler, corsHeaders]
