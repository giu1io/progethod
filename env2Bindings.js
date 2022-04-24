/* eslint-disable no-console */
const dotenv = require('dotenv')

console.log(
  Object.keys(
    dotenv.config().parsed
  )
    .reduce((acc, key) => {
      return `${acc} ${key}="${process.env[key]}"`
    }, '--binding')
)
