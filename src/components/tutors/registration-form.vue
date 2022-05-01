<template>
  <div class="ts-card p-8">
    <div class="text-center mb-8 text-size-16">Register as a tutor now</div>
    <form @submit.prevent="register">
      <div class="flex flex-col space-y-8">
        <!-- FIRSTNAME -->
        <label class="flex flex-col space-y-2">
          <span class="font-bold">First name</span>
          <input type="text" class="ts-input" v-model.trim="tutor.firstName" />
        </label>
        <!-- LASTNAME -->
        <label class="flex flex-col space-y-2">
          <span class="font-bold">Last name</span>
          <input type="text" class="ts-input"  v-model.trim="tutor.lastName" />
        </label>
        <!-- DESCRIPTION -->
        <label class="flex flex-col space-y-2">
          <span class="font-bold">Description</span>
          <textarea rows="5" class="ts-input pt-2" v-model="tutor.description"/>
        </label>
        <!-- HOURLY RATE -->
        <label class="flex flex-col space-y-2">
          <span class="font-bold">Hourly rate</span>
          <input type="number" class="ts-input" v-model.number="tutor.hourlyRate" />
        </label>
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
import { AREAS_OPTIONS } from '~/constants.js'

const REGISTRATION_MODEL = {
  firstName: '',
  lastName: '',
  description: '',
  hourlyRate: null
}

export default {
  name: 'registration-form',
  components: {
    TsFieldChecklist: defineAsyncComponent(() =>
      import('~/components/fields/ts-field-checklist.vue')
    )
  },
  emits: ['register'],
  data: () => ({
    tutor: REGISTRATION_MODEL,
    areasOptions: AREAS_OPTIONS,
    checkedAreas: []
  }),
  methods: {
    register() {
      const data = {
        id: '818690e3-d1d9-489e-82cc-799e640d16fb',
        firstName: this.tutor.firstName,
        lastName: this.tutor.lastName,
        areas: this.checkedAreas,
        description: this.tutor.description,
        hourlyRate: this.tutor.hourlyRate
      }

      this.$emit('register', data)
    }
  }
};
</script>
