<template>
  <div class="mx-auto max-w-card pt-8">
    <!-- ALERT -->
    <ts-alert :show="showAlert" :message="message" @close="clearMessage" />

    <div class="text-center mb-8 text-size-16">Register as a tutor now</div>
    <ts-form :form-schema="tutorSchema" :saving="saving" @validate="register">
    <!-- FIRSTNAME -->
    <ts-field-input
      v-model="tutorSchema.firstName.value"
      v-model:valid="tutorSchema.firstName.valid"
      v-model:touched="tutorSchema.firstName.touched"
      :rules="tutorSchema.firstName.rules"
    >
      First name
    </ts-field-input>

    <!-- LASTNAME -->
    <ts-field-input
      v-model="tutorSchema.lastName.value"
      v-model:valid="tutorSchema.lastName.valid"
      v-model:touched="tutorSchema.lastName.touched"
      :rules="tutorSchema.lastName.rules"
    >
      Last name
    </ts-field-input>

    <!-- DESCRIPTION -->
    <ts-field-textarea
      v-model="tutorSchema.description.value"
      v-model:valid="tutorSchema.description.valid"
      v-model:touched="tutorSchema.description.touched"
      :rules="tutorSchema.description.rules"
    >
      Description
    </ts-field-textarea>

    <!-- HOURLY RATE -->
    <ts-field-input
      v-model="tutorSchema.hourlyRate.value"
      v-model:valid="tutorSchema.hourlyRate.valid"
      v-model:touched="tutorSchema.hourlyRate.touched"
      type="number"
      :rules="tutorSchema.hourlyRate.rules"
    >
      Hourly rate
    </ts-field-input>

    <!-- AREAS OF EXPERTISE -->
    <div class="flex flex-col space-y-2">
      <span class="font-bold">Areas of expertise</span>
      <ts-field-checklist v-model:checked="checkedAreas" :options="areasOptions" />
    </div>

      <template #action-buttons="{ disabled }">
        <spinner-button
          type="submit"
          class="ts-button-main mt-6"
          :saving="saving"
          :disabled="disabled"
        >
          Register
        </spinner-button>
      </template>
    </ts-form>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';
import { AREAS_OPTIONS } from '~/constants';
import tutorApi from '~/api/tutors'
import TsAlert from '~/components/layout/ts-alert.vue'

const TUTOR_SCHEMA = {
  firstName: {
    value: '',
    valid: true,
    touched: false,
    rules: ['required', 'limit']
  },
  lastName: {
    value: '',
    valid: true,
    touched: false,
    rules: ['required', 'limit']
  },
  description: {
    value: '',
    valid: true,
    touched: false,
    rules: ['limit']
  },
  hourlyRate: {
    value: '',
    valid: true,
    touched: false,
    rules: ['required', 'integer']
  }
}

export default {
  name: 'tutor-registration',
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
    TsFieldChecklist: defineAsyncComponent(() =>
        import('~/components/fields/ts-field-checklist.vue')
    ),
    SpinnerButton: defineAsyncComponent(() =>
      import('~/components/layout/spinner-button.vue')
    )
  },
  data: () => ({
    saving: false,
    tutorSchema: TUTOR_SCHEMA,
    areasOptions: AREAS_OPTIONS,
    checkedAreas: [],
    message: {
      text: '',
      type: ''
    }
  }),
  computed: {
    userId() {
      const user = this.$store.state.user
      return (user && user.localId) || ''
    },

    showAlert() {
      return Boolean(this.message.text)
    }
  },
  methods: {
    register() {
      this.saving = true

      const tutor = {
        tutorId: this.userId,
        firstName: this.tutorSchema.firstName.value,
        lastName: this.tutorSchema.lastName.value,
        areas: this.checkedAreas,
        description: this.tutorSchema.description.value,
        hourlyRate: this.tutorSchema.hourlyRate.value
      }

      tutorApi.createTutor(tutor)
        .then(() => this.$store.commit('CLEAR_LAST_FETCH_TUTORS_TIMESTAMP'))
        .then(() => this.$router.push('/tutors'))
        .catch( ({ message }) => {
          this.message.text = message || 'Failed to fetch'
          this.message.type = 'error'
        })
        .finally(() => (this.saving = false))
    },

    clearMessage() {
      this.message.text = ''
      this.message.type = ''
    }
  }
};
</script>
