<template>
  <ts-header />
  <router-view v-slot="{ Component }">
    <Transition name="route" mode="out-in">
      <component :is="Component" />
    </Transition>
  </router-view>
</template>

<script>
import TsHeader from '~/components/layout/ts-header.vue'
import authUtils from '~/utils/auth'

export default {
  name: 'page-layout',
  components: {
    TsHeader
  },
  mounted() {
    const user = authUtils.getUser()

    if (user) {
      this.$store.commit('SET_USER', user)
    }
  }
}
</script>
