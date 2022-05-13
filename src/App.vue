<template>
  <ts-header />
  <router-view v-slot="{ Component }">
    <Transition name="route" mode="out-in">
      <component :is="Component" />
    </Transition>
  </router-view>
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
