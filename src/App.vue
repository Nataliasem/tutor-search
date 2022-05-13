<template>
    <ts-header />
    <Transition name="route">
      <router-view />
    </Transition>
</template>

<script>
import { defineAsyncComponent } from 'vue';

export default {
  name: 'app',
  components: {
  TsHeader: defineAsyncComponent(() =>
      import('~/components/layout/ts-header.vue')
    ),
  }
}
</script>
