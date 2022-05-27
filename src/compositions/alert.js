import { ref } from 'vue';

export default () => {
  const isShown = ref(false)
  const message = ref('')
  const type = ref('')

  const showAlert = (messageText, messageType) => {
    message.value = messageText
    type.value = messageType || 'success'
    isShown.value = true
  }

  const hideAlert = () => {
    isShown.value = false
    type.value = ''
    message.value = ''
  }

  return {
    isShown,
    message,
    type,
    showAlert,
    hideAlert
  }
}
