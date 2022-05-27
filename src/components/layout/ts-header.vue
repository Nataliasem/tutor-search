<template>
  <header class="border-b border-slate-300 py-4 px-8">
    <nav class="flex justify-between items-center">
      <!-- LOGO -->
      <router-link to="/" class="font-bold text-size-18 text-gray-800">Tutor Search</router-link>

      <!-- NAVIGATION LINKS -->
      <div class="flex items-center space-x-3">
        <router-link
          to="/tutors"
          class="ts-nav-link"
          :class="{ 'active': activeLink === '/tutors' }"
        >
          All tutors
        </router-link>

        <template v-if="isAuthenticated && isTutor">
          <span class="h-5 w-px bg-slate-300 mx-5" />
          <router-link
            to="/requests"
            class="ts-nav-link"
            :class="{ 'active': activeLink === '/requests' }"
          >
            Requests
          </router-link>
        </template>
      </div>

      <div class="flex items-center space-x-3">
        <template v-if="isAuthenticated">
          <!-- USER INFO -->
          <div>Hello, {{ userName }}!</div>

          <!-- REGISTER AS TUTOR -->
          <router-link v-if="isTutor === false" to='/register' class="ts-button-main">Register as a tutor</router-link>

          <!-- LOG OUT -->
          <button
            type="button"
            class="ts-rounded-icon"
            title="Log out"
            @click="logOut"
          >
            <icon-log-out />
          </button>
        </template>

        <!-- LOG IN -->
        <router-link
          v-else
          to='/user-auth'
          class="ts-rounded-icon"
          title="Log in"
        >
          <icon-user />
        </router-link>
      </div>
    </nav>
  </header>
</template>

<script>
import IconUser from '~/components/icons/icon-user.vue'
import IconLogOut from '~/components/icons/icon-log-out.vue'

export default {
  name: 'ts-header',
  components: {
    IconUser,
    IconLogOut
  },
  computed: {
    activeLink() {
      return this.$route.path
    },

    userName() {
      const user = this.$store.state.user

      return (user && user.email) || ''
    },

    isAuthenticated() {
      return this.$store.getters.isAuthenticated
    },

    isTutor() {
      return this.$store.getters.isTutor
    }
  },
  methods: {
    logOut() {
      this.$store.commit('REMOVE_USER')

      this.$router.push('/')
    }
  }
}
</script>


<style>
.ts-nav-link {
  @apply border-b border-transparent;
}

.ts-nav-link:hover {
  @apply text-sky-500;
}

.ts-nav-link.active {
  @apply text-sky-600 border-sky-600;
}
</style>
