export const state = () => ({
  projects: [],
  isUpdating: false,
  lastUpdatedAt: new Date(0).toISOString()
})

export const getters = {
  projects (state) {
    return state.projects
  },
  isUpdating (state) {
    return state.isUpdating
  },
  lastUpdatedAt (state) {
    return state.lastUpdatedAt
  }
}

export const mutations = {
  add (state, entry) {
    state.projects.push(entry)
  },
  update (state, { data, id }) {
    state.projects.find(p => p.id === id).data = data
  },
  remove (state, id) {
    state.projects.splice(state.entries.findIndex(p => p.id === id), 1)
  },
  replace (state, projects) {
    state.projects = projects
    state.lastUpdatedAt = new Date().toISOString()
  },
  reset (state) {
    state.projects = []
  },
  updateStarted (state) {
    state.isUpdating = true
  },
  updateEnded (state) {
    state.isUpdating = false
  }
}
