<template>
  <div class="mx-auto max-w-card pt-8">
    <!-- ALERT -->
    <ts-alert :show="Boolean(error)" @close="clearError">{{ error }}</ts-alert>

    <div class="text-center mb-8 text-size-16">Contact a tutor</div>
    <ts-form :form-schema="contactSchema" submit-text="Send" :saving="saving" @validate="send">
      <!-- EMAIL -->
      <ts-field-input
        v-model="contactSchema.email.value"
        v-model:valid="contactSchema.email.valid"
        :required="contactSchema.email.required"
      >
        Your email
      </ts-field-input>

      <!-- MESSAGE -->
      <ts-field-textarea
        v-model="contactSchema.message.value"
        v-model:valid="contactSchema.message.valid"
        :required="contactSchema.message.required"
      >
        Message
      </ts-field-textarea>
    </ts-form>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import requestsApi from '~/api/requests'
import TsAlert from '~/components/layout/ts-alert.vue'

const CONTACT_SCHEMA = {
  email: {
    required: true,
    value: '',
    valid: true
  },
  message: {
    required: true,
    value: '',
    valid: true
  },
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
    )
  },
  data: () => ({
    contactSchema: CONTACT_SCHEMA,
    saving: false,
    error: ''
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

      requestsApi.createRequest(request)
        .then(() => this.$store.commit('CLEAR_LAST_FETCH_REQUESTS_TIMESTAMP'))
        .then(() => this.$router.push('/requests'))
        .catch( ({ message }) => {
          this.error = message || 'Failed to fetch'
        })
        .finally(() => (this.saving = false))
    },

    clearError() {
      this.error = ''
    }
  }
};
</script>

