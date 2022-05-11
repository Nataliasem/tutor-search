<template>
  <div class="mx-auto max-w-card pt-8">
    <div class="text-center mb-8 text-size-16">Contact a tutor</div>
    <ts-form :form-schema="contactSchema" submit-text="Send" @validate="send">
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
  }),
  methods: {
    send() {
      this.$store.commit('tutors/addTutor', {
        email: this.contactSchema.email,
        message: this.contactSchema.message
      })

      this.$router.push('/requests')
    }
  }
};
</script>

