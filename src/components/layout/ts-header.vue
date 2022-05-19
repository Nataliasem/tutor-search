<template>
  <header class="border-b border-slate-300 py-4 px-8">
    <nav class="flex justify-between items-center">
      <router-link to="/" class="font-bold text-size-18 text-gray-800">Tutor Search</router-link>
      <div class="flex items-center space-x-3">
        <router-link to="/tutors">All tutors</router-link>
        <span class="h-5 w-px bg-slate-300 mx-5" />
        <router-link to="/requests">All requests</router-link>
      </div>
      <div class="flex items-center space-x-3">
        <template v-if="isAuthenticated">
          <div>Hello, {{ userName }}!</div>
          <router-link to='/register' class="ts-button-main">Register as a tutor</router-link>
        </template>

        <router-link v-else to='/user-auth' class="ts-button-secondary">Log in</router-link>
      </div>
    </nav>
  </header>
</template>

<script>
import authUtils from '~/utils/auth'

export default {
  name: 'app-header',
  computed: {
    userName() {
      const user = authUtils.getUser()

      return (user && user.email) || ''
    },

    isAuthenticated() {
      return Boolean(authUtils.getAuthToken())
    }
  }
};
</script>
