import {AUTH_BASE_URL, API_KEY } from '~/constants';
import { responseHandler } from '~/network-service'

export default {
  createAccount(data) {
    const config = {
      method: 'POST',
      body: JSON.stringify(data)
    }

    return fetch(`${AUTH_BASE_URL}:signUp?key=${API_KEY}`, config)
      .then(response => responseHandler(response))
  },

  logIn(data) {
    const config = {
      method: 'POST',
      body: JSON.stringify(data)
    }

    return fetch(`${AUTH_BASE_URL}:signInWithPassword?key=${API_KEY}`, config)
      .then(response => responseHandler(response))
  }
}
