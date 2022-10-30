export const state = () => ({
  requireConfirmationOnSubmit: true
})

export const getters = {
  isConfirmOnSubmitRequired (state) {
    return state.requireConfirmationOnSubmit
  }
}

export const mutations = {
  setRequireSubmitConfirmation (state, value) {
    state.requireConfirmationOnSubmit = value
  }
}
