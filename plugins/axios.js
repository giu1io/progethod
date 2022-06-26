export default function ({ $axios, store, env }, inject) {
  $axios.onRequest((config) => {
    if (!config.headers['x-sf-sess-id']) {
      config.headers['x-sf-sess-id'] = store.getters['user/authToken']
    }
  })

  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    if (code === 401) {
      store.commit('user/invalidateToken')
    }
  })

  // Create a custom axios instance
  const jira = $axios.create({})

  // Set baseURL to something different
  jira.setBaseURL(`${env.apiBaseUrl}jira/`)

  jira.onRequest((config) => {
    if (!config.headers.authorization && !config.auth) {
      const { email, apiKey } = store.getters['jira/credentials']
      config.auth = {
        username: email,
        password: apiKey
      }
    }
  })

  jira.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    if (code === 401) {
      store.commit('jira/invalidateApiKey')
    }
  })

  // Inject to context as $api
  inject('jira', jira)
}
