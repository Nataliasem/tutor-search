export default {
  setUser(user) {
    if(!user) {
      return
    }

    localStorage.setItem('USER', JSON.stringify(user))
  },

  getUser() {
    return JSON.parse(localStorage.getItem('USER')) || null
  },

  removeUser() {
    localStorage.removeItem('USER')
  },

  getAuthToken() {
    const user = JSON.parse(localStorage.getItem('USER')) || null

    return (user && user.idToken) || ''
  }
}