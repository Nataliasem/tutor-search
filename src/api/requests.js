import NetworkService from '~/network-service'

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
    return NetworkService.post('/requests.json', request)
  }
}