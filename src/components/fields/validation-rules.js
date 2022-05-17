export default {
  required(value) {
    if(!value) {
      return 'Should not be empty'
    }

    if(Array.isArray(value)) {
      return value.length > 0 ? '' : 'Should not be empty'
    }

    if(typeof value === 'object') {
      const keys = Object.keys(value)
      return keys.length > 0 ? '' : 'Should not be empty'
    }

    return ''
  },

  email(value) {
    const isValid = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Zа-яёА-ЯЁ\-0-9]+\.)+[a-zA-Zа-яёА-ЯЁ]{2,}))$/.test(
      value || ''
    )

    return isValid ? '' : 'Enter the correct email'
  },

  password(value) {
    const length = (value || []).length > 0
    const latinLettersUppercase = /[A-Z]/.test(value)
    const latinLettersLowercase = /[a-z]/.test(value)
    const digits = /\d/.test(value)
    const specialCharacters = /[.,:;?!*+%/\-<>@[\]{}\\_$#]/.test(value)

    if(!length || !latinLettersUppercase || !latinLettersLowercase || !digits || !specialCharacters) {
      return 'The password should contain at least 8 characters: uppercase and lowercase Latin letters, numbers, special characters'
    }

    return ''
  }
}