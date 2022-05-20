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
      d="M8.25 19.25H4.58333C4.0971 19.25 3.63079 19.0568 3.28697 18.713C2.94315 18.3692 2.75 17.9029 2.75 17.4167V4.58333C2.75 4.0971 2.94315 3.63079 3.28697 3.28697C3.63079 2.94315 4.0971 2.75 4.58333 2.75H8.25"
    />
    <path d="M14.666 15.5837L19.2493 11.0003L14.666 6.41699" />
    <path d="M19.25 11H8.25" />
  </svg>
</template>

<script>
export default {
  name: 'icon-log-out',
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
