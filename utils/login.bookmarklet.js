// eslint-disable-next-line no-unused-vars
function bookmarkletSource () {
  /*

    Copy the following code into a bookmarklet generator and
    paste the compiled code below

  */
  // eslint-disable-next-line no-template-curly-in-string
  const baseUrl = '${process.env.feUrl}login?token='
  const w = window.open('', 'w2')
  window.cookieStore.get('SFSESSID').then((c) => {
    w.location = baseUrl + c.value
    w.focus()
  })
}

export default `javascript:(function()%7Bconst%20baseUrl%20%3D%20'${process.env.feUrl}login%3Ftoken%3D'%0A%20%20const%20w%20%3D%20window.open(''%2C%20'w2')%0A%20%20window.cookieStore.get('SFSESSID').then((c)%20%3D%3E%20%7B%0A%20%20%20%20w.location%20%3D%20baseUrl%20%2B%20c.value%0A%20%20%20%20w.focus()%0A%20%20%7D)%7D)()%3B`
