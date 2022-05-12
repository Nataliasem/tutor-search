import { BASE_URL } from '~/constants.js';

export default {
  loadRequests() {
    return fetch(`${BASE_URL}/requests.json`)
      .then(response => response.json())
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
    const config = {
      method: 'POST',
      body: JSON.stringify(request)
    }

    return fetch(`${BASE_URL}/requests.json`, config)
      .then(response => response.json())
      .then(request => request)
  }
}