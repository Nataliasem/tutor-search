const BASE_URL = 'https://tutor-search-6aa47-default-rtdb.firebaseio.com'

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
    const config = {
      method: 'POST',
      body: JSON.stringify(tutor)
    }

    return fetch(`${BASE_URL}/tutors.json`, config)
      .then(response => response.json())
      .then(tutor => tutor)
  }
}
