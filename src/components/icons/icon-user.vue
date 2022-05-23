<template>
  <svg
    :width="width"
    :height="height"
    viewBox="0 0 22 22"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18.3327 19.25V17.4167C18.3327 16.4442 17.9464 15.5116 17.2587 14.8239C16.5711 14.1363 15.6385 13.75 14.666 13.75H7.33268C6.36022 13.75 5.42759 14.1363 4.73996 14.8239C4.05232 15.5116 3.66602 16.4442 3.66602 17.4167V19.25"
    />
    <path
      d="M11.0007 10.0833C13.0257 10.0833 14.6673 8.44171 14.6673 6.41667C14.6673 4.39162 13.0257 2.75 11.0007 2.75C8.97561 2.75 7.33398 4.39162 7.33398 6.41667C7.33398 8.44171 8.97561 10.0833 11.0007 10.0833Z"
    />
  </svg>
</template>

<script>
export default {
  name: 'icon-user',
  props: {
    width: {
      type: Number,
      default: 18
    },

    height: {
      type: Number,
      default: 18
    }
  }
}
</script>
