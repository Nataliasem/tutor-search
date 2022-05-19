const currentUser = JSON.parse(localStorage.getItem('USER')) || null

export default {
  getUser() {
    return currentUser
  },

  getUserId() {
    return (currentUser && currentUser.localId) || ''
  },

  getUserAuthToken() {
    return (currentUser && currentUser.idToken) || ''
  },

  setUser(user) {
    if(!user) {
      return
    }

    localStorage.setItem('USER', JSON.stringify(user))
  },

  removeUser() {
    localStorage.removeItem('USER')
  },
}