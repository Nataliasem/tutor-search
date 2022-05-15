// export const GET = () {
//
// }

export default {
  post(url, data) {
    const config = {
      method: 'POST',
      body: JSON.stringify(data)
    }

    return fetch(url, config)
      .then(response => responseHandler(response))
      .then(response => response)
  }
}

const responseHandler = (response) => {
  if (response.status === 500) {
    return Promise.reject({ message: 'The server is unavailable. Try again later' })
  }

  if (response.status === 401) {
    return Promise.reject({ message: 'First you need to log in' })
  }

  if (response.ok === false) {
    const status = response.status
    const statusText = response.statusText

    return Promise.reject({ message: `${status}: ${statusText}` })
  }

  return response.json()
}