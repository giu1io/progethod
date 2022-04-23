import { v4 as uuid } from 'uuid'

export const state = () => ({
  entries: []
})

export const getters = {
  entries (state) {
    return state.entries
  }
}

export const actions = {
  add (ctx, { day, data }) {
    const entry = {
      data,
      id: uuid(),
      day
    }
    ctx.commit('add', entry)
    return entry
  }
}

export const mutations = {
  add (state, entry) {
    state.entries.push(entry)
  },
  update (state, { data, id }) {
    state.entries.find(p => p.id === id).data = data
  },
  remove (state, id) {
    state.entries.splice(state.entries.findIndex(p => p.id === id), 1)
  }
}
