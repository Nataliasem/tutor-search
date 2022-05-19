import NetworkService from '~/network-service'
import authUtils from '~/utils/auth'

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
    const authToken = authUtils.getUserAuthToken()

    if(!authToken) {
      return Promise.reject({ message: 'No auth token'})
    }

    return NetworkService.post(`/tutors.json?auth=${authToken}`, tutor)
  }
}
