<template>
    <div class="ts-base-card space-y-3">
      <!-- FULL NAME -->
      <div class="text-size-22">{{ fullName }}</div>

      <!-- HOURLY RATE -->
      <div>{{ hourlyRate }}</div>

      <!-- AREAS -->
      <div class="space-x-2">
        <div v-for="area in tutor.areas" :key="area" class="ts-base-badge" :class="area">{{ area }}</div>
      </div>

      <!-- ACTIONS -->
      <div class="flex justify-end space-x-5">
        <ts-base-button mode="link" :to="tutorContactLink">Contact</ts-base-button>
        <ts-base-button mode="link" :to="tutorDetailsLink">View details</ts-base-button>
      </div>
    </div>
</template>

<script>
import TsBaseButton from '../ui/ts-base-button.vue'

export default {
  name: 'tutor-item',
  components: {
    TsBaseButton
  },
  props: {
    tutor: {
      type: Object,
      request: true
    }
  },
  computed: {
    fullName() {
      const firstName = this.tutor.firstName || ''
      const lastName = this.tutor.lastName || ''

      return `${firstName} ${lastName}`
    },

    hourlyRate() {
      const rate = this.tutor.hourlyRate || ''

      return '$' + rate + '/hour'
    },

    tutorDetailsLink() {
      const path = this.$route.path
      const id = this.tutor.id || ''

      return `${path}/${id}`
    },

    tutorContactLink() {
      return `${this.tutorDetailsLink}/contact`
    },

  }
}
</script>
