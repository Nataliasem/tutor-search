import NetworkService from '~/network-service'
import store from '~/store'

export default {
  loadTutors() {
    return NetworkService.get('/tutors.json')
      .then(tutors => {
        const ids = Object.keys(tutors)

        return ids.map(id => {
          return {
            id: id,
            ...tutors[id]
          }
        })
      })
  },

  loadTutor(id) {
    return NetworkService.get(`/tutors/${id}.json`)
  },

  createTutor(tutor) {
    const authToken = store.getters.authToken

    if(!authToken) {
      console.error('No auth token')
      return
    }

    return NetworkService.post(`/tutors.json?auth=${authToken}`, tutor)
  }
}
