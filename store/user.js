import { isAfter, addSeconds, parseISO } from 'date-fns'

export const state = () => ({
  authToken: null,
  isTokenExpired: false,
  info: {
    usr_id: 0,
    employee_id: 0,
    email: '',
    name: '',
    surname: '',
    pic: null
  },
  hasAuthorizedGCal: false,
  googleTokenExpiration: null
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
  isGoogleTokenValid (state) {
    return state.googleTokenExpiration && isAfter(parseISO(state.googleTokenExpiration), new Date())
  },
  isGCalSetup (state) {
    return state.hasAuthorizedGCal
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
  },
  authorizedGoogleToken (state, expiresIn) {
    state.hasAuthorizedGCal = true
    state.googleTokenExpiration = (addSeconds(new Date(), expiresIn)).toISOString()
  }
}
