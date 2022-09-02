<template>
  <div class="mx-auto max-w-card pt-8">
    <!-- ALERT -->
    <ts-alert
      v-if="isShown"
      :message="message"
      :type="type"
      @hide="hideAlert"
    />

    <div class="text-center mb-8 text-size-16">Contact a tutor</div>
    <ts-form
      :form-schema="contactSchema"
      submit-text="Send"
      :saving="saving"
      @validate="send"
    >
      <!-- EMAIL -->
      <ts-field-input
        v-model="contactSchema.email.value"
        v-model:valid="contactSchema.email.valid"
        v-model:touched="contactSchema.email.touched"
        :rules="contactSchema.email.rules"
      >
        Your email
      </ts-field-input>

      <!-- MESSAGE -->
      <ts-field-textarea
        v-model="contactSchema.message.value"
        v-model:valid="contactSchema.message.valid"
        v-model:touched="contactSchema.message.touched"
        :rules="contactSchema.message.rules"
      >
        Message
      </ts-field-textarea>

      <template #action-buttons="{ disabled }">
        <spinner-button
          type="submit"
          class="ts-button-main mt-6"
          :saving="saving"
          :disabled="disabled"
        >
          Send
        </spinner-button>
      </template>
    </ts-form>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import requestsApi from '~/api/requests'
import TsAlert from '~/components/layout/ts-alert.vue'
import alert from '~/compositions/alert'

const CONTACT_SCHEMA = {
  email: {
    value: '',
    valid: true,
    touched: false,
    rules: ['required', 'email']
  },
  message: {
    value: '',
    valid: true,
    touched: false,
    rules: ['required', 'limit']
  }
}

export default {
  name: 'contact-tutor',
  components: {
    TsAlert,
    TsForm: defineAsyncComponent(() =>
      import('~/components/fields/ts-form.vue')
    ),
    TsFieldInput: defineAsyncComponent(() =>
      import('~/components/fields/ts-field-input.vue')
    ),
    TsFieldTextarea: defineAsyncComponent(() =>
      import('~/components/fields/ts-field-textarea.vue')
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
    contactSchema: CONTACT_SCHEMA,
    saving: false
  }),
  computed: {
    tutorId() {
      return this.$route.params.id
    }
  },
  methods: {
    send() {
      this.saving = true
      const request = {
        tutorId: this.tutorId,
        email: this.contactSchema.email.value,
        message: this.contactSchema.message.value
      }

      requestsApi
        .createRequest(request)
        .then(() => this.$store.commit('CLEAR_LAST_FETCH_REQUESTS_TIMESTAMP'))
        .then(() => this.showAlert('The request has been sent', 'success'))
        .catch(({ message }) => {
          this.showAlert(message || 'Failed to fetch')
        })
        .finally(() => (this.saving = false))
    }
  }
}
</script>
