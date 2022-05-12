<template>
  <div class="mx-auto max-w-card pt-8">
    <div class="text-center mb-8 text-size-16">Register as a tutor now</div>
    <ts-form :form-schema="tutorSchema" submit-text="Register" @validate="register">
    <!-- FIRSTNAME -->
    <ts-field-input
      v-model="tutorSchema.firstName.value"
      v-model:valid="tutorSchema.firstName.valid"
      :required="tutorSchema.firstName.required"
    >
      First name
    </ts-field-input>

    <!-- LASTNAME -->
    <ts-field-input
      v-model="tutorSchema.lastName.value"
      v-model:valid="tutorSchema.lastName.valid"
      :required="tutorSchema.lastName.required"
    >
      Last name
    </ts-field-input>

    <!-- DESCRIPTION -->
    <ts-field-textarea
      v-model="tutorSchema.description.value"
      v-model:valid="tutorSchema.description.valid"
      :required="tutorSchema.description.required"
    >
      Description
    </ts-field-textarea>

    <!-- HOURLY RATE -->
    <ts-field-input
      v-model="tutorSchema.hourlyRate.value"
      v-model:valid="tutorSchema.hourlyRate.valid"
      :required="tutorSchema.hourlyRate.required"
    >
      Hourly rate
    </ts-field-input>

    <!-- AREAS OF EXPERTISE -->
    <div class="flex flex-col space-y-2">
      <span class="font-bold">Areas of expertise</span>
      <ts-field-checklist v-model:checked="checkedAreas" :options="areasOptions" />
    </div>
    </ts-form>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';
import { AREAS_OPTIONS } from '~/constants';
import tutorApi from '~/api/tutors'

const TUTOR_SCHEMA = {
  firstName: {
    required: true,
    value: '',
    valid: true
  },
  lastName: {
    required: true,
    value: '',
    valid: true
  },
  description: {
    required: false,
    value: '',
    valid: true
  },
  hourlyRate: {
    required: true,
    value: '',
    valid: true
  }
}

export default {
  name: 'tutor-registration',
  components: {
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
    )
  },
  data: () => ({
    tutorSchema: TUTOR_SCHEMA,
    areasOptions: AREAS_OPTIONS,
    checkedAreas: [],
  }),
  methods: {
    register() {
      const tutor = {
        // TODO: currentUser id
        id: '818690e3-d1d9-489e-82cc-799e640d16fb',
        firstName: this.tutorSchema.firstName.value,
        lastName: this.tutorSchema.lastName.value,
        areas: this.checkedAreas,
        description: this.tutorSchema.description.value,
        hourlyRate: this.tutorSchema.hourlyRate.value
      }

      tutorApi.updateTutor(tutor)
        .then(tutor => this.$store.commit('tutors/addTutor', tutor))
        .then(() => this.$router.push('/tutors'))
        .then(() => console.log('error'))
    }
  }
};
</script>
