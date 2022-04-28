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
        <router-link :to="tutorContactLink">Contact</router-link>
        <router-link :to="tutorDetailsLink">View details</router-link>
      </div>
    </div>
</template>

<script>

export default {
  name: 'tutor-item',
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
