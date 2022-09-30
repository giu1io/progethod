import ShortUniqueId from 'short-unique-id'
import { durationRequiresAdjustment, getDecimalDuration } from '~/utils/duration'
const uid = new ShortUniqueId({ length: 10 })

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
      id: uid(),
      day
    }
    ctx.commit('add', entry)
    return entry
  }
}

function resetEntryDurations (data) {
  data.decimal_duration = getDecimalDuration(data.duration)
  data.requires_adjustment = durationRequiresAdjustment(data.duration)
  data.adjusted = false
  return data
}

export const mutations = {
  add (state, { day, id, data }) {
    state.entries.push({
      day,
      id,
      data: resetEntryDurations(data)
    })
  },
  update (state, { data, id }) {
    state.entries.find(p => p.id === id).data = resetEntryDurations(data)
  },
  updateLocation (state, { location, id }) {
    state.entries.find(p => p.id === id).data.location = location
  },
  adjust (state, { adjustment, id }) {
    const entry = state.entries.find(p => p.id === id)
    entry.data.decimal_duration = (entry.data.decimal_duration * 10 + adjustment * 10) / 10
    entry.data.adjusted = true
  },
  resetAdjustment (state, id) {
    resetEntryDurations(state.entries.find(p => p.id === id).data)
  },
  remove (state, id) {
    state.entries.splice(state.entries.findIndex(p => p.id === id), 1)
  },
  restoreBackup (state, entries) {
    state.entries = entries
  }
}
