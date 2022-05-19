import NetworkService from '~/network-service'
import store from '~/store'

export default {
  loadRequests() {
    return NetworkService.get('/requests.json')
      .then(requests => {
        if(!requests) {
          return []
        }

        const ids = Object.keys(requests)

        if(ids.length === 0) {
          return  []
        }

        return ids.map(id => {
          return {
            id: id,
            ...requests[id]
          }
        })
      })
  },

  createRequest(request) {
    const authToken = store.getters.authToken

    if(!authToken) {
      return Promise.reject({ message: 'No auth token'})
    }

    return NetworkService.post(`/requests.json?auth=${authToken}`, request)
  }
}