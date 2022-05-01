<template>
  <app-header />
  <router-view />
</template>

<script>
import { defineAsyncComponent } from 'vue';

export default {
  name: 'app',
  components: {
  AppHeader: defineAsyncComponent(() =>
      import('~/components/layout/ts-header.vue')
    ),
  }
}
</script>
