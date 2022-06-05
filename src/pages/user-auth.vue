<template>
  <div class="mx-auto max-w-card pt-8">
    <!-- ALERT -->
    <ts-alert
      v-if="isShown"
      :message="message"
      :type="type"
      @hide="hideAlert"
    />

    <div class="text-center mb-8 text-size-16">Start using Tutor Search</div>
    <ts-form
      :form-schema="authSchema"
      submit-text="Log in"
      :saving="saving"
      @validate="handleAuth"
    >
      <!-- EMAIL -->
      <ts-field-input
        v-model="authSchema.email.value"
        v-model:valid="authSchema.email.valid"
        v-model:touched="authSchema.email.touched"
        :rules="authSchema.email.rules"
      >
        Email
      </ts-field-input>

      <!-- PASSWORD -->
      <ts-field-input
        v-model="authSchema.password.value"
        v-model:valid="authSchema.password.valid"
        v-model:touched="authSchema.password.touched"
        type="password"
        :rules="authSchema.password.rules"
      >
        Password
      </ts-field-input>

      <template #action-buttons="{ disabled }">
        <div class="flex items-center space-x-2 mt-6">
          <spinner-button
            type="submit"
            class="ts-button-main"
            :saving="saving && mode === 'log-in'"
            :disabled="disabled"
            @click="switchMode('log-in')"
          >
            Log in
          </spinner-button>

          <spinner-button
            type="submit"
            class="ts-button-secondary"
            :saving="saving && mode === 'register'"
            :disabled="disabled"
            @click="switchMode('register')"
          >
            Register
          </spinner-button>
        </div>
      </template>
    </ts-form>
  </div>
</template>

<script>
const AUTH_SCHEMA = {
  email: {
    value: '',
    valid: true,
    touched: false,
    rules: ['required', 'email']
  },
  password: {
    value: '',
    valid: true,
    touched: false,
    rules: ['required', 'password']
  }
}

import { defineAsyncComponent } from 'vue'
import authApi from '~/api/auth'
import alert from '~/compositions/alert'

export default {
  name: 'user-auth',
  components: {
    TsAlert: defineAsyncComponent(() =>
      import('~/components/layout/ts-alert.vue')
    ),
    TsForm: defineAsyncComponent(() =>
      import('~/components/fields/ts-form.vue')
    ),
    TsFieldInput: defineAsyncComponent(() =>
      import('~/components/fields/ts-field-input.vue')
    ),
    SpinnerButton: defineAsyncComponent(() =>
      import('~/components/layout/spinner-button.vue')
    )
  },
  setup() {
    const { isShown, message, type, showAlert, hideAlert } = alert()

    return {
      isShown,
      message,
      type,
      showAlert,
      hideAlert
    }
  },
  data: () => ({
    saving: false,
    authSchema: AUTH_SCHEMA,
    mode: 'log-in'
  }),
  methods: {
    switchMode(mode) {
      this.mode = mode
    },

    logIn(data) {
      return authApi.logIn(data).then((user) => {
        this.$store.commit('SET_USER', user)

        const email = (user && user.email) || ''
        if (email) {
          this.showAlert(`Welcome back, ${email}!`, 'success')
        }
      })
    },

    register(data) {
      return authApi
        .createAccount(data)
        .then((user) => this.$store.commit('SET_USER', user))
        .then(() =>
          this.showAlert('You have successfully registered', 'success')
        )
    },

    handleAuth() {
      this.saving = true

      const data = {
        email: this.authSchema.email.value,
        password: this.authSchema.password.value,
        returnSecureToken: true
      }

      Promise.resolve()
        .then(() => {
          return this.mode === 'log-in' ? this.logIn(data) : this.register(data)
        })
        // TODO: get rid of Timeout
        .then(() => setTimeout(() => this.$router.push('/'), 2000))
        .catch(({ message }) => {
          this.showAlert(message || 'Failed to fetch')
        })
        .finally(() => (this.saving = false))
    }
  }
}
</script>
