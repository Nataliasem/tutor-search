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

        const currentUser = authUtils.getUser()
        if(!currentUser) {
          return []
        }


        return ids.map(id => {
          return {
            id: id,
            ...requests[id]
          }
        }).filter(item => item.tutorId === currentUser.localId)
      })
  },

  createRequest(request) {
    return NetworkService.post('/requests.json', request)
  }
}