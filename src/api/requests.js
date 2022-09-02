import NetworkService from '~/network-service'
import store from '~/store'

export default {
  loadRequests() {
    return NetworkService.get('/requests.json').then((requests) => {
      if (!requests) {
        return []
      }

      const ids = Object.keys(requests)

      if (ids.length === 0) {
        return []
      }

      const currentUserId = store.state.user && store.state.user.localId
      if (!currentUserId) {
        return []
      }

      return ids
        .map((id) => {
          return {
            id: id,
            ...requests[id]
          }
        })
        .filter((item) => item.tutorId === currentUserId)
    })
  },

  createRequest(request) {
    return NetworkService.post('/requests.json', request)
  }
}
