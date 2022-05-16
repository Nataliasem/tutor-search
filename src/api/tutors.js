import NetworkService from '~/network-service'

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
    return NetworkService.post(`/tutors.json`, tutor)
  }
}
