export const state = () => ({
  apiKey: null,
  email: null,
  isApiKeyInvalid: false,
  info: {},
  projects: []
})

export const getters = {
  canMakeRequests (state) {
    return state.apiKey && state.email && !state.isApiKeyInvalid
  },
  credentials (state) {
    return {
      apiKey: state.apiKey,
      email: state.email
    }
  },
  isApiKeyInvalid (state) {
    return state.isApiKeyInvalid
  },
  info (state) {
    return state.info
  },
  projects (state) {
    return state.projects
  }
}

export const mutations = {
  setCredentials (state, { apiKey, email }) {
    state.apiKey = apiKey
    state.email = email
    state.isApiKeyInvalid = false
  },
  updateInfo (state, info) {
    state.info = info
  },
  invalidateApiKey (state) {
    state.isApiKeyInvalid = true
  },
  setProjects (state, projects) {
    state.projects = projects
  }
}
