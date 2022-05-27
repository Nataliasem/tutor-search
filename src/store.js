import { createStore } from 'vuex'
import authUtils from '~/utils/auth'

const store = createStore({
  state() {
    return {
      user: null,
      requests: [],
      tutors: [],
      lastFetchTutorsTimestamp: null,
      lastFetchRequestsTimestamp: null
    }
  },
  getters: {
    isAuthenticated(state) {
      return state.user && state.user.idToken
    },

    isTutor(state) {
      return state.user && state.user.isTutor
    }
  },
  mutations: {
    SET_USER(state, user) {
      authUtils.setUser(user)

      state.user = user
    },

    REMOVE_USER(state) {
      authUtils.removeUser()

      state.user = null
    },

    SET_TUTORS(state, tutors) {
      state.tutors = tutors
    },
    SET_REQUESTS(state, requests) {
      state.requests = requests
    },
    SET_LAST_FETCH_TUTORS_TIMESTAMP(state) {
      state.lastFetchTutorsTimestamp = new Date().getTime()
    },
    CLEAR_LAST_FETCH_TUTORS_TIMESTAMP(state) {
      state.lastFetchTutorsTimestamp = null
    },
    SET_LAST_FETCH_REQUESTS_TIMESTAMP(state) {
      state.lastFetchRequestsTimestamp = new Date().getTime()
    },
    CLEAR_LAST_FETCH_REQUESTS_TIMESTAMP(state) {
      state.lastFetchRequestsTimestamp = null
    },
  }
})

export default store
