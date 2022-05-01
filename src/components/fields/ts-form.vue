<template>
  <div class="ts-card p-8">
    <div class="text-center mb-8 text-size-16">Register as a tutor now</div>
    <form @submit.prevent="register">
      <div class="flex flex-col space-y-8">
        <!-- FIRSTNAME -->
          <ts-field-input
            v-model="tutor.firstName.value"
            v-model:valid="tutor.firstName.valid"
            v-model:touched="tutor.firstName.touched"
            :required="tutor.firstName.required"
          >
            First name
          </ts-field-input>

        <!-- LASTNAME -->
        <ts-field-input
          v-model="tutor.lastName.value"
          v-model:valid="tutor.lastName.valid"
          v-model:touched="tutor.lastName.touched"
          :required="tutor.lastName.required"
        >
          Last name
        </ts-field-input>

        <!-- DESCRIPTION -->
        <ts-field-textarea
          v-model="tutor.description.value"
          v-model:valid="tutor.description.valid"
          v-model:touched="tutor.description.touched"
          :required="tutor.description.required"
        >
          Description
        </ts-field-textarea>

        <!-- HOURLY RATE -->
        <ts-field-input
          v-model="tutor.hourlyRate.value"
          v-model:valid="tutor.hourlyRate.valid"
          v-model:touched="tutor.hourlyRate.touched"
          :required="tutor.hourlyRate.required"
        >
          Hourly rate
        </ts-field-input>

        <!-- AREAS OF EXPERTISE -->
        <div class="flex flex-col space-y-2">
          <span class="font-bold">Areas of expertise</span>
          <ts-field-checklist v-model:checked="checkedAreas" :options="areasOptions" />
        </div>
      </div>
      <button type="submit" class="ts-button-main mt-8">Register</button>
    </form>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';
import { AREAS_OPTIONS } from '~/constants'
import clonedeep from 'lodash.clonedeep'

const REGISTRATION_MODEL = {
  firstName: {
    required: true,
    value: '',
    valid: true,
    touched: false
  },
  lastName: {
    required: true,
    value: '',
    valid: true,
    touched: false
  },
  description: {
    required: false,
    value: '',
    valid: true,
    touched: false
  },
  hourlyRate: {
    required: true,
    value: '',
    valid: true,
    touched: false
  }
}

export default {
  name: 'ts-form',
  components: {
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
  emits: ['register'],
  data: () => ({
    tutor: clonedeep(REGISTRATION_MODEL),
    areasOptions: AREAS_OPTIONS,
    checkedAreas: []
  }),
  methods: {
    register() {
      const isTouched = Object.keys(this.tutor).every(item => item.touched)

      if(!isTouched) {
        for (const key in this.tutor) {
          if(this.tutor[key].required) {
            this.tutor[key].valid = false
          }
        }

        return
      }

      const isValid = Object.keys(this.tutor).every(item => item.valid)
      if(!isValid) {
        return
      }

      const data = {
        id: '818690e3-d1d9-489e-82cc-799e640d16fb',
        firstName: this.tutor.firstName.value,
        lastName: this.tutor.lastName.value,
        areas: this.checkedAreas.value,
        description: this.tutor.description.value,
        hourlyRate: this.tutor.hourlyRate.value
      }

      this.$emit('register', data)
    }
  }
};
</script>
