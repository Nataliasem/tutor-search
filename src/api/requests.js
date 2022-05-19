import NetworkService from '~/network-service'
import authUtils from '~/utils/auth'

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

        const currentUserId = authUtils.getUserId()
        if(!currentUserId) {
          return []
        }


        return ids.map(id => {
          return {
            id: id,
            ...requests[id]
          }
        }).filter(item => item.tutorId === currentUserId)
      })
  },

  createRequest(request) {
    return NetworkService.post('/requests.json', request)
  }
}