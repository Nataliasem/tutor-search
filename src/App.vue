<template>
  <app-header />
  <router-view />
</template>

<script>
import AppHeader from '~/components/layout/ts-header.vue'

export default {
  name: 'app',
  components: {
    AppHeader
  }
}
</script>
