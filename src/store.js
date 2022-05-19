import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      requests: [],
      tutors: [],
      lastFetchTutorsTimestamp: null,
      lastFetchRequestsTimestamp: null
    }
  },
  mutations: {
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