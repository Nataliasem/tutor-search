const BASE_URL = 'https://tutor-search-6aa47-default-rtdb.firebaseio.com'

export default {
  loadTutors() {
    return fetch(`${BASE_URL}/tutors.json`)
      .then(response => response.json())
      .then(tutors => tutors)
  },

  updateTutor(tutor) {
    const id = tutor.id

    const config = {
      method: 'PUT',
      body: JSON.stringify(tutor)
    }

    return fetch(`${BASE_URL}/tutors/${id}.json`, config)
      .then(response => response.json())
      .then(tutor => tutor)
  }
}
