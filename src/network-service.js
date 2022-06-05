import { BASE_URL } from '~/constants'

export default {
  get(url) {
    return fetch(`${BASE_URL}${url}`).then((response) =>
      responseHandler(response)
    )
  },

  post(url, data) {
    const config = {
      method: 'POST',
      body: JSON.stringify(data)
    }

    return fetch(`${BASE_URL}${url}`, config).then((response) =>
      responseHandler(response)
    )
  }
}

export const responseHandler = (response) => {
  if (!response || !response.status) {
    return Promise.reject({
      message: 'The server is unavailable. Try again later'
    })
  }

  if (response.ok) {
    return response.json()
  }

  const error = {
    message: ''
  }

  if (response.status >= 400 && response.status < 500) {
    const status = response.status
    const statusText = response.statusText || 'Invalid request'

    error.message = `${status}: ${statusText}`
  }

  if (response.status >= 500) {
    error.message = 'Sorry, there was an error on the server'
  }

  if (response.status === 401) {
    error.message = 'First you need to log in'
  }

  return Promise.reject(error)
}
