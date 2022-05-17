<template>
  <div class="mx-auto max-w-card pt-8">
    <!-- ALERT -->
    <ts-alert :show="Boolean(error)" @close="clearError">{{ error }}</ts-alert>

    <div class="text-center mb-8 text-size-16">Register as a tutor now</div>
    <ts-form :form-schema="authSchema" :submit-text="submitText" @validate="handleAuth">
      <!-- EMAIL -->
      <ts-field-input
        v-model="authSchema.email.value"
        v-model:valid="authSchema.email.valid"
        :required="authSchema.email.required"
      >
        Email
      </ts-field-input>

      <!-- PASSWORD -->
      <ts-field-input
        v-model="authSchema.password.value"
        v-model:valid="authSchema.password.valid"
        :required="authSchema.password.required"
      >
        Password
      </ts-field-input>
    </ts-form>
  </div>
</template>

<script>
const AUTH_SCHEMA = {
  email: {
    required: true,
    value: '',
    valid: true
  },
  password: {
    required: true,
    value: '',
    valid: true
  }
}

import { defineAsyncComponent } from 'vue';
import authApi from '~/api/auth'
import TsAlert from '~/components/layout/ts-alert.vue'

export default {
  name: 'user-auth',
  components: {
    TsAlert,
    TsForm: defineAsyncComponent(() =>
      import('~/components/fields/ts-form.vue')
    ),
    TsFieldInput: defineAsyncComponent(() =>
      import('~/components/fields/ts-field-input.vue')
    )
  },
  data: () => ({
    authSchema: AUTH_SCHEMA,
    error: ''
  }),
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated || false
    },

    submitText() {
      return this.isAuthenticated ? 'Sign in' : 'Sign up'
    }
  },
  methods: {
    handleAuth() {
      const data = {
        email: this.authSchema.email.value,
        password: this.authSchema.password.value,
        returnSecureToken: true
      }

      Promise.resolve()
        .then(() => {
          return this.isAuthenticated ? authApi.signIn(data) : authApi.signUp(data)
        })
        .then(user => this.$store.commit('SET_USER', user))
        .catch( ({ message }) => {
          this.error = message || 'Failed to fetch'
        })
    },

    clearError() {
      this.error = ''
    }
  }
};
</script>
e>