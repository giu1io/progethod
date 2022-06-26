export function getCorsHeaders (env) {
  const baseCors = {
    'Access-Control-Allow-Headers': 'Content-Type, x-sf-sess-id, Authorization'
  }

  if (env.NODE_ENV !== 'development') {
    return baseCors
  }

  return {
    ...baseCors,
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
    'Access-Control-Max-Age': '86400'
  }
}
