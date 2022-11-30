export class TranslatableError extends Error {
  constructor (message, errorData = {}) {
    super(message)
    this.errorData = errorData
  }
}
