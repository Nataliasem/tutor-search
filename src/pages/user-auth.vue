<template>
  <div class="mx-auto max-w-card pt-8">
    <!-- ALERT -->
    <ts-alert :show="showAlert" :message="message" @close="clearMessage" />

    <div class="text-center mb-8 text-size-16">Register as a tutor now</div>
    <ts-form :form-schema="authSchema" :submit-text="submitText" @validate="handleAuth">
      <!-- EMAIL -->
      <ts-field-input
        v-model="authSchema.email.value"
        v-model:valid="authSchema.email.valid"
        :rules="authSchema.email.rules"
      >
        Email
      </ts-field-input>

      <!-- PASSWORD -->
      <ts-field-input
        v-model="authSchema.password.value"
        v-model:valid="authSchema.password.valid"
        type="password"
        :rules="authSchema.password.rules"
      >
        Password
      </ts-field-input>
    </ts-form>
  </div>
</template>

<script>
const AUTH_SCHEMA = {
  email: {
    value: '',
    valid: true,
    rules: ['required', 'email']
  },
  password: {
    value: '',
    valid: true,
    rules: ['required', 'password']
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
    message: {
      text: '',
      type: ''
    }
  }),
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated || false
    },

    submitText() {
      return this.isAuthenticated ? 'Sign in' : 'Sign up'
    },

    showAlert() {
      return Boolean(this.message.text)
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
        .then(() => (this.message.text = 'The user has been successfully registered'))
        .catch( ({ message }) => {
          this.message.text = message || 'Failed to fetch'
          this.message.type = 'error'
        })
    },

    clearMessage() {
      this.message.text = ''
      this.message.type = ''
    }
  }
};
</script>
