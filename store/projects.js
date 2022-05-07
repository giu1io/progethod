import { v4 as uuid } from 'uuid'

export const state = () => ({
  projects: []
})

export const getters = {
  projects (state) {
    return state.projects
  }
}

export const actions = {
  add (ctx, name) {
    const project = {
      name,
      id: uuid()
    }
    ctx.commit('add', project)
    return project
  }
}

export const mutations = {
  add (state, project) {
    state.projects.push(project)
  },
  update (state, project) {
    const updateIndex = state.projects.findIndex(p => p.id === project.id)
    state.projects[updateIndex] = project
  },
  remove (state, id) {
    state.projects.splice(state.projects.findIndex(p => p.id === id), 1)
  }
}
