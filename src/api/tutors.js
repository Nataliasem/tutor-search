import NetworkService from '~/network-service'
import store from '~/store'

export default {
  loadTutors() {
    return NetworkService.get('/tutors.json').then((tutors) => {
      const ids = Object.keys(tutors)

      return ids.map((id) => {
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
    const user = store.state.user
    const authToken = (user && user.idToken) || ''

    if (!authToken) {
      return Promise.reject({ message: 'No auth token' })
    }

    return NetworkService.post(`/tutors.json?auth=${authToken}`, tutor)
  }
}
