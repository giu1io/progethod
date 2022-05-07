export const state = () => ({
  projects: [],
  isUpdating: false
})

export const getters = {
  projects (state) {
    return state.projects
  },
  isUpdating (state) {
    return state.isUpdating
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
