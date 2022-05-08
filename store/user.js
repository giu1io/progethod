export const state = () => ({
  authToken: null,
  isTokenExpired: false,
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
  canMakeRequests (state) {
    return state.authToken && !state.isTokenExpired
  },
  authToken (state) {
    return state.authToken
  },
  isTokenExpired (state) {
    return state.isTokenExpired
  },
  info (state) {
    return state.info
  }
}

export const mutations = {
  setToken (state, token) {
    state.authToken = token
    state.isTokenExpired = false
  },
  updateInfo (state, info) {
    state.info = info
  },
  invalidateToken (state) {
    state.isTokenExpired = true
  }
}
