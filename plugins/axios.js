export default function ({ $axios, redirect, store }) {
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
}
