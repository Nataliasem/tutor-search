export default {
  namespaced: true,
  state() {
    return {
      requests: []
    }
  },
  mutations: {
    addRequest(state, request) {
      state.requests.push(request)
    }
  },
  actions: {
    sendRequest(context, requestInfo) {
      const request = {
        id: new Date().toISOString(),
        ...requestInfo
      }

      context.commit('addRequest', request)
    }
  },
  getters: {
    requests(state, getters, routeState, routeGetters) {
      const currentTutor = routeGetters['tutors/currentTutor']

      return !currentTutor
        ? []
        : (state.requests || []).filter(item => item.tutorId === currentTutor.id)
    },
    hasRequests(state, getters) {
      return getters.requests.length > 0
    }
  }
}