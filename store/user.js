export const state = () => ({
  authToken: null,
  info: {
    usr_id: 0,
    employee_id: 0,
    email: '',
    name: '',
    surname: '',
    pic: 'https://tuk-cdn.s3.amazonaws.com/assets/components/boxed_layout/bl_1.png'
  }
})

export const getters = {
  authToken (state) {
    return state.authToken
  },
  info (state) {
    return state.info
  }
}

export const mutations = {
  setToken (state, token) {
    state.authToken = token
  },
  updateInfo (state, info) {
    state.info = info
  }
}
