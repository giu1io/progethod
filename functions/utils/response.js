export class JSONResponse extends Response {
  constructor (body, options) {
    if (!options) {
      options = {}
    }

    options.headers = {
      'Content-Type': 'application/json',
      ...options.headers
    }

    super(JSON.stringify(body), options)
  }
}
