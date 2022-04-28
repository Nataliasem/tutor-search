<template>
  <app-header />
  <router-view />
</template>

<script>
import AppHeader from '~/components/layout/app-header.vue'

export default {
  name: 'app',
  components: {
    AppHeader
  }
}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");

* {
  box-sizing: border-box;
}

html {
  font-family: "Roboto", sans-serif;
}

body {
  margin: 0;
}
</style>
