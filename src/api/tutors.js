import { BASE_URL } from '~/constants'
import NetworkService from '~/network-service'

export default {
  loadTutors() {
    return fetch(`${BASE_URL}/tutors.json`)
      .then(response => response.json())
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
    return fetch(`${BASE_URL}/tutors/${id}.json`)
      .then(response => response.json())
      .then(tutor => tutor)
  },

  createTutor(tutor) {
    return NetworkService.post(`${BASE_URL}/tutors.json`, tutor)
  }
}
